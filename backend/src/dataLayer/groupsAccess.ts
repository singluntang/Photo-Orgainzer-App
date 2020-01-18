import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
var AWSXRay = require('aws-xray-sdk');
import { Feed } from '../models/Feed'
import { createLogger } from '../utils/logger'
import Jimp from 'jimp';
const logger = createLogger('groupAcess')


let AWSConect: any

if (process.env.IS_OFFLINE.toLowerCase() === "true") {
  AWSConect = AWS        
}
else {
  AWSConect = AWSXRay.captureAWS(AWS)
}


export class GroupAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly s3Client: any = createS3Client(),    
    private readonly groupsTable = process.env.GROUPS_TABLE, 
    private readonly feedsTable = process.env.FEEDS_TABLE,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET,
    private readonly urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION))    
        
    {
    }

    async createGroup(): Promise<boolean> {

      let error: boolean = false;

     await this.docClient.batchWrite({
        RequestItems: {
          'Groups-dev': [
            {
              DeleteRequest: {
                Key: { id: '1' }
              }
            },            
            {
              DeleteRequest: {
                Key: { id: '2' }
              }
            },                        
            {
              DeleteRequest: {
                Key: { id: '3' }
              }
            },            
            {
              DeleteRequest: {
                Key: { id: '4' }
              }
            } 
            ,            
            {
              DeleteRequest: {
                Key: { id: '5' }
              }
            } 
            ,            
            {
              DeleteRequest: {
                Key: { id: '6' }
              }
            } 
            ,            
            {
              DeleteRequest: {
                Key: { id: '7' }
              }
            } 
            ,            
            {
              DeleteRequest: {
                Key: { id: '8' }
              }
            }                                                         
          ]
        }
      }).promise()
      .then(() => {
        logger.info('Items deleted', {delete: 'deleted'})
      })
      .catch((e) => {
        logger.info('Failed to delete', {delete: e.message}) 
        error = true
      })

      if (error) return true

      await this.docClient.batchWrite({
        RequestItems: {
          'Groups-dev': [            
            {              
              PutRequest: {
                Item: {
                  "id": "1",
                  "name": "Pets",
                  "description": "Dogs and Cats"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "2",
                  "name": "Vacation",
                  "description": "All my Vacation Pics"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "3",
                  "name": "Friends",
                  "description": "All my Friends Pics"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "4",
                  "name": "Family",
                  "description": "All my Family Pics"
                }
              }
            },
            ,          
            {
              PutRequest: {
                Item: {
                  "id": "5",
                  "name": "Stars / Adols",
                  "description": "Singer and Movie Stars"
                }
              }
            }  
            ,          
            {
              PutRequest: {
                Item: {
                  "id": "6",
                  "name": "un grouped",
                  "description": "Un-defined Pics"
                }
              }
            } 
            ,          
            {
              PutRequest: {
                Item: {
                  "id": "7",
                  "name": "Cars",
                  "description": "All type of Cars"
                }
              }
            }
            ,          
            {
              PutRequest: {
                Item: {
                  "id": "8",
                  "name": "Sports",
                  "description": "All pics related to Sports"
                }
              }
            }                                               
          ]
        }
      }).promise()
      .then(() => {
        logger.info('Items added', {added: 'item added'})
      })
      .catch((e) => {
        logger.info('Failed to add', {added: e.message}) 
        error = true
      })

      return error
    }   

  async getAllGroups(): Promise<any> {
    const result = await this.docClient.scan({
      TableName: this.groupsTable
    }).promise()

    const items = result.Items

    logger.info('Getting groups', {items}) 

    return items 
  }

  async createFeed(feed: Feed): Promise<Feed> {
    await this.docClient.put({
      TableName: this.feedsTable,
      Item: feed
    }).promise()

    return feed as Feed
  }

  async getGroupFeeds(groupId: string): Promise<Feed[]> {
    const params = {
      TableName: this.feedsTable,
      ProjectionExpression: "groupId, imageId, #ts, title, description, imageUrl",
      FilterExpression: "groupId = :groupId",
      ExpressionAttributeNames:{
        "#ts": "timestamp"
      },    
      ExpressionAttributeValues: {
          ":groupId": groupId
      }
    }
  
    const result = await this.docClient.scan(params).promise();
  
    const items = result.Items
    return items as Feed[]
  }

  async getUploadUrl(imageId: string): Promise<string> {

    var params = {Bucket: this.bucketName, Key: imageId, Expires: this.urlExpiration};

    logger.info('UrlUpload Param', params)
    
    return await Promise.resolve(this.s3Client.getSignedUrl('putObject', params))
 
  }

  async deleteFeed(imageId: string) {

    const params = {
      TableName: this.feedsTable,
      Key:{
          "imageId": imageId
      },
      ConditionExpression:"imageId = :imageId",   
      ExpressionAttributeValues:{
          ":imageId":imageId
      },
    };

    await this.docClient.delete(params).promise();

    await this.s3Client
      .deleteObject({
        Bucket: this.bucketName,
        Key: imageId,
      })
      .promise()    

    await this.s3Client
      .deleteObject({
        Bucket: this.thumbnailBucketName,
        Key: `${imageId}.jpeg`,
      })
      .promise()    
 
  }
  
  async attachUrlToFeed(uploadUrl: string, imageId: string) {

    const params = {
      TableName: this.feedsTable,
      Key:{
          "imageId": imageId
      },
      ConditionExpression:"imageId = :imageId",
      UpdateExpression: "set imageUrl = :r",     
      ExpressionAttributeValues:{
          ":imageId":imageId,
          ":r":uploadUrl
      },
    };

    await this.docClient.update(params).promise();
 
  }

  async processFeedImage(key: string) {

    logger.info('Processing S3 item with key: ', {key})

    try {     
        const response = await this.s3Client
          .getObject({
            Bucket: this.bucketName,
            Key: key
          })
          .promise()  
      
        const body = response.Body
        const image = await Jimp.read(body)

        const resizedImg = await Promise.resolve(image.resize(550, Jimp.AUTO))
      
        logger.info('Buffer',{resizedImg})

        const convertedBuffer = await resizedImg.getBufferAsync(Jimp.MIME_JPEG)

        await this.s3Client
          .putObject({
            Bucket: this.thumbnailBucketName,
            Key: `${key}.jpeg`,
            Body: convertedBuffer
          })
          .promise()

          logger.info('Writing image back to S3 bucket', {success: true})          
    }
    catch(error) {
      logger.info('Error in  Processing Image', {error})
      throw new Error(`Error in  Processing Image: ${error}`);
    }

  }
}

  function createDynamoDBClient() {
  if (process.env.IS_OFFLINE.toLowerCase() === "true") {
    logger.info('Creating a local DynamoDB instance', {offline: true})
    return new AWSConect.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new AWSConect.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
}

function createS3Client() {
  let S3: any
 /* if (process.env.IS_OFFLINE === "True") {
    logger.info('Creating a local S3 instance', {})
    const S3 = new XAWS.S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER', // This specific key is required when working offline
      secretAccessKey: 'S3RVER',
    });
    return S3;
  }*/

  S3 = new AWSConect.S3({
    signatureVersion: 'v4',
    region: process.env.BUCKET_REGION,
    params: {Bucket: process.env.IMAGES_S3_BUCKET}
  }); 


  return S3;
}
