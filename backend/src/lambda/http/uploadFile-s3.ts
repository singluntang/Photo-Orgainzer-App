import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { uploadFile } from '../../businessLogic/udagram'
import { createLogger } from '../../utils/logger'

const logger = createLogger('uploadFile')

export async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  
  logger.info("Image Binary Data", event.body)

  try {

    //const jsonData = req.apiGateway.event.body.toJSON()

    await uploadFile(event.pathParameters.imageId,event.body)  

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