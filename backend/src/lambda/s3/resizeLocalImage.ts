import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { processImage, attachUrlToFeed } from '../../businessLogic/udagram'
import { createLogger } from '../../utils/logger'

const logger = createLogger('resizeLocalImage')
const s3EndPoint = process.env.S3_BUCKET_ENDPOINT
const thumbnailBucket = process.env.THUMBNAILS_S3_BUCKET

export async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  
  logger.info("Caller Event", event)

  try {

    //const jsonData = req.apiGateway.event.body.toJSON()

    await processImage(event.pathParameters.imageId) 
    
    const imageUrl: string = `${s3EndPoint}/${thumbnailBucket}/${event.pathParameters.imageId}.jpeg`

    logger.info('imageUrl', {imageUrl})    

    await attachUrlToFeed(imageUrl, event.pathParameters.imageId)     

    return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },    
    body: JSON.stringify({
      status: true
     })
  }



 } catch (error) {
  logger.info("Error Uploading File", {error})
 }  


 return {
  statusCode: 500,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },    
  body: JSON.stringify({
    status: false
   })
}

}