import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Resumable from 'resumablejs'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getCookie } from 'utils'
import store from 'store'
import styles from './styles'


@observer
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
        this.setState({ progress: 0, uploading: false })
        store.error.message = `Upload failed on file ${file}. Error message: ${message}`
      },
    )
    uploader.on(
      'progress',
      () => {
        const progress = uploader.progress() * 100
        const uploading = progress !== 100
        this.setState({ progress, uploading })
        if (!uploading) {
          const files = this.state.files.map(file => ({
            src: file.data,
            height: 500,
            width: 500,
          }))
          store.error.message = 'Files uploaded'
          this.setState({ files: [] })
          this.props.onClose(files)
        }
      },
    )
    uploader.addFiles(this.state.files.map(file => file.file))
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
      ? <CircularProgress variant="static" value={this.state.progress} />
      : 'Start upload'
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
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
          <Button variant="outlined" color="primary" onClick={this.handleUpload}>
            Select files
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleUploadStart}>
            {upload}
          </Button>
        </DialogActions>
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
