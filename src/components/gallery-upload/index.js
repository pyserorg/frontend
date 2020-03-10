import React from 'react'
import PropTypes from 'prop-types'
import Resumable from 'resumablejs'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  CircularProgress,
} from '@material-ui/core'
import {
  getCookie,
  withStore,
} from 'freenit'

import styles from './styles'


class GalleryUpload extends React.Component {
  state = {
    files: [],
    progress: 0,
    uploading: false,
  }

  fileInput = React.createRef()

  handleFileChange = (event) => {
    this.setState({ progress: 0 })
    for (let i = 0; i < event.target.files.length; ++i) {
      const reader = new FileReader()
      const file = event.target.files[i]
      reader.onload = (e) => this.setState(
        prevState => ({
          files: [
            ...prevState.files,
            {
              file,
              data: e.target.result,
            },
          ],
        }),
      )
      reader.readAsDataURL(event.target.files[i])
    }
  }

  handleUpload = () => {
    this.fileInput.current.click()
  }

  handleUploadStart = () => {
    const cookie = getCookie('csrf_access_token')
    const uploader = new Resumable({
      simultaneousUploads: 1,
      target: this.props.target,
      testChunks: false,
      headers: {
        'X-CSRF-TOKEN': cookie,
      },
    })
    this.setState({ uploading: true })
    uploader.on('filesAdded', () => uploader.upload())
    uploader.on(
      'error',
      (message, file) => {
        const { notification } = this.props.store
        this.setState({ progress: 0, uploading: false })
        notification.show(
          `Upload failed on file ${file}. Error message: ${message}`,
        )
      },
    )
    uploader.on(
      'progress',
      () => {
        const { notification } = this.props.store
        const progress = uploader.progress() * 100
        const uploading = progress < 100
        this.setState({ progress, uploading })
        if (!uploading) {
          const files = this.state.files.map(file => ({
            src: file.data,
            height: 500,
            width: 500,
            name: file.file.name,
          }))
          notification.show('Files uploaded')
          this.setState({ files: [] })
          this.props.onClose(files)
          if (this.props.onSuccess) {
            this.props.onSuccess(files)
          }
        }
      },
    )
    uploader.addFiles(this.state.files.map(file => file.file))
  }

  handleClose = () => {
    this.props.onClose([])
  }

  render() {
    const filePreview = this.state.files.map(file => (
      <img
        key={file.file.name}
        src={file.data}
        style={styles.preview}
        alt=""
      />
    ))
    const upload = this.state.uploading
      ? (
        <CircularProgress
          variant="static"
          value={this.state.progress}
          color="secondary"
        />
      )
      : 'Start upload'
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Upload pictures</DialogTitle>
        <input
          ref={this.fileInput}
          type="file"
          accept="image/*"
          style={styles.input}
          multiple
          onChange={this.handleFileChange}
        />
        <div style={styles.root}>
          {filePreview}
        </div>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleUpload}
          >
            Select files
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleUploadStart}
          >
            {upload}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}


GalleryUpload.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  open: PropTypes.bool,
  target: PropTypes.string.isRequired,
}


GalleryUpload.defaultProps = {
  open: false,
}


export default withStore(GalleryUpload)
