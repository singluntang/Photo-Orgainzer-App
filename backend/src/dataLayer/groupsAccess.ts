import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)
import { Feed } from '../models/Feed'
import { createLogger } from '../utils/logger'
import Jimp from 'jimp';
const logger = createLogger('groupAcess')


export class GroupAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly groupsTable = process.env.GROUPS_TABLE, 
    private readonly feedsTable = process.env.FEEDS_TABLE,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET,
    private readonly region = process.env.BUCKET_REGION,
    private readonly urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION))    
        
    {}

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
          ]
        }
      }).promise()
      .then(() => {
        logger.info('Items deleted', '')
      })
      .catch((e) => {
        logger.info('Failed to delete', e.message) 
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
                  "name": "Dogs",
                  "description": "Only dog images here!"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "2",
                  "name": "Nature",
                  "description": "What can be a better object for photography"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "3",
                  "name": "Cities",
                  "description": "Creative display of urban settings"
                }
              }
            },          
            {
              PutRequest: {
                Item: {
                  "id": "4",
                  "name": "Computers",
                  "description": "For the techies among us"
                }
              }
            },
            ,          
            {
              PutRequest: {
                Item: {
                  "id": "5",
                  "name": "Foods",
                  "description": "For those who like to eat"
                }
              }
            }            
          ]
        }
      }).promise()
      .then(() => {
        logger.info('Items added', '')
      })
      .catch((e) => {
        logger.info('Failed to add', e.message) 
        error = true
      })

      return error
    }    

  async getAllGroups(): Promise<any> {
    const result = await this.docClient.scan({
      TableName: this.groupsTable
    }).promise()

    const items = result.Items

    logger.info('Getting groups', items) 

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

  getUploadUrl(imageId: string): string {

    const s3 = new XAWS.S3({
      signatureVersion: 'v4',
      region: this.region
    });    

    var params = {Bucket: this.bucketName, Key: imageId, Expires: this.urlExpiration};

    logger.info('UrlUpload Param', params)
    
    return s3.getSignedUrl('putObject', params)
 
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


    const s3 = new XAWS.S3({
      signatureVersion: 'v4',
      region: this.region,
      params: {Bucket: this.bucketName}
    });
    
    await s3
      .deleteObject({
        Bucket: this.bucketName,
        Key: imageId,
      })
      .promise()    

    await s3
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

    console.log('Processing S3 item with key: ', key)
    const s3 = new XAWS.S3({
      signatureVersion: 'v4',
      region: this.region,
      params: {Bucket: this.bucketName}
    });  
  
    const response = await s3
      .getObject({
        Bucket: this.bucketName,
        Key: key
      })
      .promise()  
  
    const body = response.Body
    const image = await Jimp.read(body)
                    .then(image => {
                      return image
                      .resize(550, Jimp.AUTO) // resize
                    })
                    . then(resizedImg => {
                      return resizedImg
                    })
  
    logger.info('Buffer',image)

    const convertedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG)
  
    logger.info('Writing image back to S3 bucket', this.thumbnailBucketName)
    await s3
      .putObject({
        Bucket: this.thumbnailBucketName,
        Key: `${key}.jpeg`,
        Body: convertedBuffer
      })
      .promise()

  }
}

  function createDynamoDBClient() {
  if (process.env.IS_OFFLINE === "True") {
    logger.info('Creating a local DynamoDB instance', '')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
}
