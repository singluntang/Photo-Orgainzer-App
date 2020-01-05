import * as React from 'react'
import { createFeed, uploadFile } from '../api/feeds-api'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'

enum UploadState {
  NoUpload,
  UploadingData,
  UploadingFile,
}

interface createFeedProps {
  match: {
    params: {
      groupId: string
    }
  }
  auth: Auth
}

interface createFeedState {
  item: ImageUploadInfo
  file: any
  uploadState: UploadState
}

export class CreateFeed extends React.PureComponent<
  createFeedProps,
  createFeedState
> {
  state: createFeedState = {
    item: {groupId: this.props.match.params.groupId, 
           title: '', 
           description: ''},
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ item: {groupId: this.state.item.groupId,
                           title: event.target.value, 
                           description: this.state.item.description }})
  }

  handleDescritionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ item: {groupId: this.state.item.groupId,
                           title: this.state.item.title, 
                           description: event.target.value }})
  }  

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    console.log('File change', files)
    this.setState({
      file: files[0]
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
      
    event.preventDefault()

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.UploadingData)
      const uploadInfo: ImageUploadResponse = await createFeed(this.props.auth.getIdToken(), this.state.item)

      console.log('Created image', uploadInfo)

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadInfo.uploadUrl, this.state.file)

      alert('Image was uploaded!')
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
    
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }


  render() {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Image title"
              value={this.state.item.title}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Image Description"
              value={this.state.item.description}
              onChange={this.handleTitleChange}
            />
          </Form.Field>          
          <Form.Field>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.UploadingData && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
}
