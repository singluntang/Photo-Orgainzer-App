import { apiEndpoint } from '../config'
import { FeedModel } from '../types/FeedModel'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'

export async function getFeeds(groupId: string, idToken: string): Promise<FeedModel[]> {
  console.log('Fetching Feeds')
  const response = await fetch(`${apiEndpoint}/groups/${groupId}/feeds`, {
                              method: 'GET',
                              headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${idToken}`
                              }
                            })
  const result = await response.json()

  return result.items
}

export async function createFeed(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {

  const reply = await fetch(
    `${apiEndpoint}/groups/${newImage.groupId}/feeds`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title,
        description: newImage.description
      })
    }
  )

  return await reply.json()
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}
