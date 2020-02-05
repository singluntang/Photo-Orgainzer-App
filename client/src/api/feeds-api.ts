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



export async function deleteFeed(
  imageId: string,
  idToken: string
): Promise<boolean> {

  try {
    const reply = await fetch(
      `${apiEndpoint}/feeds/${imageId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          imageId
        })
      }
    )    
  } catch (error) {
    return false
  }
  return true
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  
  await fetch(uploadUrl, {
    method: 'PUT',   
    body: file
  })
}


//-----------------------------------------------This part is for Offline Local-------------------------------------------

export async function uploadFileLocal(file: any, imageId: string): Promise<boolean> {

  const data64 = file.toString('base64')
  var base64data = new Buffer(data64, 'binary');

  console.log("Upload File",base64data)

  let reply = await fetch(`${apiEndpoint}/imageUpload/${imageId}`, {
    method: 'PUT',            
    body: base64data
  })

  let result: any = await reply.json()

  //if(result.status)  {
  //  reply = await fetch(`${apiEndpoint}/processimage/${imageId}`)    
  //  result = await reply.json()
  //}

  return result.status

}

