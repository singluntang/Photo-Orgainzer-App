import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import { uploadFile } from '../../businessLogic/udagram'
import { createLogger } from '../../utils/logger'

const logger = createLogger('uploadFile')

export async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  
  logger.info("Image Binary Data", {"Binary Data": event.body})

  try {
    const dataBase64 = new Buffer(event.body.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    //logger.info("Binary Data WithOut Header", {"Binary Data Only": dataBase64})
    
    await uploadFile(event.pathParameters.imageId,dataBase64)  

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