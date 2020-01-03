import { apiEndpoint } from '../config'
import { FeedModel } from '../types/FeedModel'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'

export async function getFeeds(groupId: string): Promise<FeedModel[]> {
  console.log('Fetching Feeds')
  const response = await fetch(`${apiEndpoint}/groups/${groupId}/images`)
  const result = await response.json()

  return result.items
}

export async function createFeed(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {

  const reply = await fetch(
    `${apiEndpoint}/groups/${newImage.groupId}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title
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
