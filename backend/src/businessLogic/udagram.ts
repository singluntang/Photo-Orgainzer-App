import * as uuid from 'uuid'
import { Feed } from '../models/Feed'
import { GroupAccess } from '../dataLayer/groupsAccess'
import { CreateFeedRequest } from '../requests/CreateFeedRequest'


const groupAccess = new GroupAccess()

export async function getAllGroups(): Promise<any> {
  return groupAccess.getAllGroups()
}

export async function getGroupFeeds(groupId: string): Promise<Feed[]> {
  return groupAccess.getGroupFeeds(groupId)
}

export async function processImage(Key) {  
  await groupAccess.processFeedImage(Key)
}

export function getUploadUrl(imageUrl: string): any {
  return groupAccess.getUploadUrl(imageUrl)
}

export async function attachUrlToImage(uploadUrl, imageId) {  
  await groupAccess.attachUrlToImage(uploadUrl, imageId)
}


export async function createGroup(): Promise<boolean> {
  return await groupAccess.createGroup()
}

export async function createFeed(
  CreateFeedRequest: CreateFeedRequest,
  groupId: string
): Promise<Feed> {

  const imageId = uuid.v4()

  return await groupAccess.createFeed({
    groupId: groupId,
    imageId,
    title: CreateFeedRequest.title,
    description: CreateFeedRequest.description,
    imageUrl: null,
    timestamp: new Date().toISOString()
  })
}
