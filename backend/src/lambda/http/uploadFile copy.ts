import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { uploadFile } from '../../businessLogic/udagram'
import { UploadFeedRequest } from '../../requests/uploadFeedRequest'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createFeed')


//module.exports.handler = async (event, context, callback) => {
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {  

  const uploadFeed: any = JSON.parse(event.body) 
  
  logger.info('Upload Url', uploadFeed)

  logger.info('Image Buffer---------------------', uploadFeed)

  //await uploadFile(uploadFeed.imageId,uploadFeed.uploadfile)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },    
    body: ''
  }

};

export const s3hook = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => { 
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(process.env));

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },    
    body: ''
  }

};