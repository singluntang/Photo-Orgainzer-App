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

export async function processImage(Key: string) {  
  await groupAccess.processFeedImage(Key)
}

export async function getUploadUrl(imageId: string): Promise<string> {
  return await groupAccess.getUploadUrl(imageId)
}

export async function uploadFile(imageId: string, file: string): Promise<void> {
  await groupAccess.uploadFile(imageId,file)
}

export async function deleteFeed(imageId: string) {
  await groupAccess.deleteFeed(imageId)
}

export async function attachUrlToFeed(uploadUrl, imageId) {  
  await groupAccess.attachUrlToFeed(uploadUrl, imageId)
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
