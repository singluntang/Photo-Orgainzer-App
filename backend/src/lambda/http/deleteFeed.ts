import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { deleteFeed } from '../../businessLogic/udagram'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createFeed')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Caller event', event)
  const imageId: string = event.pathParameters.imageId
  let DeleteSuccess: boolean = true;

  try {
    await deleteFeed(imageId)
    logger.info('Delete Item', {Success:'Success'})   
  } catch (error) {
    DeleteSuccess = false;
    logger.info('Delete Item', {error})
  }


  if(DeleteSuccess) {
    return {
        statusCode: 201,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
        },    
        body: ''
    }
  }


  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },    
    body: ''
  } 
}



