import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createFeed, getUploadUrl } from '../../businessLogic/udagram'
import { CreateFeedRequest } from '../../requests/CreateFeedRequest'
import { Feed } from '../../models/Feed'
import { createLogger } from '../../utils/logger'

const logger = createLogger('createFeed')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Caller event', event)
  const groupId: string = event.pathParameters.groupId

  const newFeed: CreateFeedRequest = JSON.parse(event.body)  

  const newItem: Feed = await createFeed(newFeed,groupId)

  logger.info('New Item', newItem)

  const url: any = getUploadUrl(newItem.imageUrl)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },    
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}



