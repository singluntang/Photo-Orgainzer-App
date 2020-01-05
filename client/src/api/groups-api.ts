import { GroupModel } from '../types/GroupModel'
import { apiEndpoint } from '../config'
import { GroupUploadInfo } from '../types/GroupUploadInfo'

export async function createGroup(idToken: string): Promise<GroupModel> {
  const reply = await fetch(`${apiEndpoint}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: ''
  })
  const result: any = await reply.json()
  
  return result.items as GroupModel
}