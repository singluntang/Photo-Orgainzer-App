import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { getAllGroups, createGroup } from '../../businessLogic/udagram';
import { createLogger } from '../../utils/logger'

const logger = createLogger('getGroups')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  
  logger.info('Caller event', event)

  let error: boolean = false
  let groups = await getAllGroups()
  let items = JSON.parse(JSON.stringify(groups))

  if (items.Count === 0) {
    error = await createGroup()
    
    if(!error) {
      groups = await getAllGroups()
      items = JSON.parse(JSON.stringify(groups))

      logger.info('Get Groups', items)    
    }
  }

  if (!error) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        items
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
