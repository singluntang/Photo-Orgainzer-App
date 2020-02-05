import * as React from 'react'
import { createFeed, uploadFile, uploadFileLocal } from '../api/feeds-api'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'
import {NavBar} from './Nav'
import { History } from 'history'
import { stage } from '../config'

enum UploadState {
  NoUpload,
  UploadingData,
  UploadingFile,
}

interface CreateFeedProps {
  history: History
  match: {
    params: {
      groupId: string
    }
  },
  auth: Auth
}

interface createFeedState {
  item: ImageUploadInfo
  file: any
  uploadState: UploadState
}

export default class CreateFeed extends React.PureComponent<CreateFeedProps, createFeedState> {
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
    let uploadInfo: ImageUploadResponse

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.UploadingData)

      
      uploadInfo = await createFeed(this.props.auth.getIdToken(), this.state.item)

      console.log('Created image', uploadInfo)

      this.setUploadState(UploadState.UploadingFile)
    
      let uploadStatus
      if (stage.localeCompare("prod")==0) {          
          await uploadFile(uploadInfo.uploadUrl, this.state.file)
      }
      else {
         uploadStatus = await uploadFileLocal(this.state.file, uploadInfo.newItem.imageId);

         (uploadStatus) ? alert('Image was uploaded!') : alert('uploaded unsuccessful!')
      }

      

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
      <React.Fragment>
          <NavBar {...this.props} auth={this.props.auth} />      
          <div>
            <h1>Upload new image</h1>

            <Form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Title</label>
                <input
                  placeholder="Image title"
                  value={this.state.item.title}
                  onChange={this.handleTitleChange}
                  className="form-control" 
                />
              </div>
              <div className='form-group'>
                <label>Description</label>
                <input
                  placeholder="Image Description"
                  value={this.state.item.description}
                  onChange={this.handleDescritionChange}
                  className="form-control" 
                />
              </div>          
              <div>
                <label>Image&nbsp;&nbsp;</label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  placeholder="Image to upload"
                  onChange={this.handleFileChange}
                />
              </div>

              {this.renderButton()}
            </Form>
          </div>
      </React.Fragment>
    )
  }

  renderButton() {

    return (
      <div>
          {(this.state.uploadState !== UploadState.NoUpload) && (
            <button className="buttonload">
                <i className="fa fa-refresh fa-spin"></i>Upload
            </button>
          )}

          {(this.state.uploadState === UploadState.NoUpload) && (
            <button className="buttonload">
                Upload
            </button>
          )}          

      </div>
    )
  }
}
