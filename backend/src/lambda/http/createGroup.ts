import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { createGroup, getAllGroups } from '../../businessLogic/udagram'
import { Group } from '../../models/Group'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)


  const error: boolean = await createGroup()
  let items: Group[];

  if (!error) {
      const groups: Group[] = await getAllGroups()
      items = JSON.parse(JSON.stringify(groups))
  }

  if (error) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: ''
    }    
  }


  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items
    })
  }
}
