import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
var AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS)

import { Group } from '../models/Group'
import { Feed } from '../models/Feed'


export class GroupAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly groupsTable = process.env.GROUPS_TABLE, 
    private readonly feedsTable = process.env.FEEDS_TABLE,
    private readonly bucketName = process.env.IMAGES_S3_BUCKET,
    private readonly urlExpiration: number = parseInt(process.env.SIGNED_URL_EXPIRATION))    
        
    {}

  async getAllGroups(): Promise<Group[]> {
    console.log('Getting all groups')

    const result = await this.docClient.scan({
      TableName: this.groupsTable
    }).promise()

    const items = result.Items
    return items as Group[]
  }

  async createGroup(group: Group): Promise<Group> {
    await this.docClient.put({
      TableName: this.groupsTable,
      Item: group
    }).promise()

    return group
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
      ProjectionExpression: "groupId, imageId, #ts, imageUrl",
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

  getUploadUrl(imageId: string): any {

    return XAWS.S3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: imageId,
      Expires: this.urlExpiration
    })
  }  

  async groupExists(groupId: string): Promise<boolean> {
    const result = await this.docClient
      .get({
        TableName: this.groupsTable,
        Key: {
          id: groupId
        }
      })
      .promise()
  
    console.log('Get group: ', result)
    return !!result.Item
  }  
}


function createDynamoDBClient() {
  if (process.env.IS_OFFLINE === "True") {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})
}
