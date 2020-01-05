import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { getGroupFeeds } from '../../businessLogic/udagram';
import { createLogger } from '../../utils/logger'
import { Feed } from '../../models/Feed'

const logger = createLogger('getFeeds')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Caller event', event)
  const groupId: string = event.pathParameters.groupId

  const feeds: Feed[] = await getGroupFeeds(groupId)
  const result: any = JSON.parse(JSON.stringify(feeds))

  logger.info('Get Feed', result)

  if (result.Count !== 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items: result
      })
    }
  }

  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
