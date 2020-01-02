import * as React from 'react'
//import { createFeed, uploadFile } from '../api/images-api'
import Auth from '../auth/Auth'

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
  title: string
  file: any
  uploadState: UploadState
}

export class CreateFeed extends React.PureComponent<
  createFeedProps,
  createFeedState
> {
  state: createFeedState = {
    title: '',
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
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
      /*
    event.preventDefault()

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.UploadingData)
      const uploadInfo = await createFeed(this.props.auth.getIdToken(), {
        groupId: this.props.match.params.groupId,
        title: this.state.title
      })

      console.log('Created image', uploadInfo)

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadInfo.uploadUrl, this.state.file)

      alert('Image was uploaded!')
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
    */
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new Feed</h1>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
            <button>Upload</button>
      </div>
    )
  }
}
