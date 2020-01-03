import { FeedModel } from './FeedModel'

export interface ImageUploadResponse {
  newItem: FeedModel
  uploadUrl: string
}
