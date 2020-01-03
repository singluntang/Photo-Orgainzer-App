import * as uuid from 'uuid'

import { Group } from '../models/Group'
import { Feed } from '../models/Feed'
import { GroupAccess, createFeed, getUploadUrl } from '../dataLayer/groupsAccess'
import { CreateGroupRequest } from '../requests/CreateGroupRequest'
import { CreateFeedRequest } from '../requests/CreateFeedRequest'


const groupAccess = new GroupAccess()

export async function getAllGroups(): Promise<Group[]> {
  return groupAccess.getAllGroups()
}

export async function getGroupFeeds(groupId: string): Promise<Feed[]> {
  return groupAccess.getGroupFeeds(groupId)
}


export function getUploadUrl(imageUrl: string): any {
  return groupAccess.getUploadUrl(imageUrl)
}

export async function groupExists(groupId: string): Promise<boolean> {
  return groupAccess.groupExists(groupId)
}


export async function createGroup(
  createGroupRequest: CreateGroupRequest
): Promise<Group> {

  const itemId = uuid.v4()

  return await groupAccess.createGroup({
    id: itemId,
    name: createGroupRequest.name,
    description: createGroupRequest.description
  })
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
    imageUrl: CreateFeedRequest.imageUrl,
    timestamp: new Date().toISOString()
  })
}
