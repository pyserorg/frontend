import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import errorActions from 'templates/empty/actions'
import { getCookie } from 'utils'
import styles from './styles'


const mapStateToProps = (/* state */) => ({
})


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
        this.props.requestError(
          `Upload failed on file ${file}. Error message: ${message}`,
        )
      },
    )
    uploader.on(
      'progress',
      () => {
        const progress = uploader.progress() * 100
        const uploading = progress !== 100
        this.setState({ progress, uploading })
        if (!uploading) {
          this.setState({ files: [] })
          this.props.requestError('Files uploaded')
          this.props.onClose()
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
        <Button onClick={this.handleUpload}>
          Select files
        </Button>
        <Button onClick={this.handleUploadStart}>
          {upload}
        </Button>
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
      </Dialog>
    )
  }
}


GalleryUpload.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  requestError: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
}


GalleryUpload.defaultProps = {
  open: false,
}


export default connect(mapStateToProps, errorActions)(
  GalleryUpload,
)
