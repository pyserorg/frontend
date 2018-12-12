import React from 'react'
import PropTypes from 'prop-types'
import Resumable from 'resumablejs'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { getCookie } from 'utils'
import styles from './styles'


class GalleryUpload extends React.Component {
  state = {
    files: [],
  }

  fileInput = React.createRef()

  uploader = new Resumable({
    target: this.props.target,
    testChunks: false,
    headers: {
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
    },
  })

  handleFileChange = (event) => {
    for (let i = 0; i < event.target.files.length; ++i) {
      const reader = new FileReader()
      const file = event.target.files[i]
      reader.onload = (e) => this.setState(
        prevState => ({
          files: [
            ...prevState.files,
            {
              data: e.target.result,
              uniqueIdentifier: file.uniqueIdentifier,
            },
          ],
        }),
      )
      reader.readAsDataURL(event.target.files[i])
    }
    this.uploader.addFiles(event.target.files)
  }

  handleUpload = () => {
    this.fileInput.current.click()
  }

  handleUploadStart = () => {
    this.uploader.upload()
  }

  render() {
    const filePreview = this.state.files.map(file => (
      <img
        key={file.uniqueIdentifier}
        src={file.data}
        style={{ height: 100, width: 100 }}
        alt=""
      />
    ))
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <DialogTitle>Upload pictures</DialogTitle>
        <Button onClick={this.handleUpload}>
          Select files
        </Button>
        <Button onClick={this.handleUploadStart}>
          Start upload
        </Button>
        <input
          ref={this.fileInput}
          type="file"
          accept="image/*"
          style={styles.file.input}
          multiple
          onChange={this.handleFileChange}
        />
        {filePreview}
      </Dialog>
    )
  }
}


GalleryUpload.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  target: PropTypes.string.isRequired,
}


GalleryUpload.defaultProps = {
  open: false,
}


export default GalleryUpload
