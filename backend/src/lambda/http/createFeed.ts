import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { groupExists, createFeed, getUploadUrl } from '../../businessLogic/udagram'
import { CreateFeedRequest } from '../../requests/CreateFeedRequest'
import { Feed } from '../../models/Feed'




export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId
  const validGroupId: boolean = await groupExists(groupId)

  if (!validGroupId) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }

  const newFeed: CreateFeedRequest = JSON.parse(event.body)  

  const newItem: Feed = await createFeed(newFeed,groupId)

  const url: any = getUploadUrl(newItem.imageUrl)

  return {
    statusCode: 201,
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}



