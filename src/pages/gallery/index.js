import React, { Component } from 'react'
import Resumable from 'resumablejs'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { getCookie } from 'utils'
import styles from './styles'


export default class Gallery extends Component {
  state = {
    files: [],
  }

  fileInput = React.createRef()

  uploader = new Resumable({
    target: '/api/v0/gallery',
    testChunks: false,
    headers: {
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
    },
  })

  handleUpload = () => {
    this.fileInput.current.click()
  }

  handleFileChange = () => {
    const files = []
    for (let i = 0; i < this.fileInput.current.files.length; ++i) {
      const file = this.fileInput.current.files[i]
      files.push({
        file,
        state: 'pending',
        done: 0,
      })
    }
    this.uploader.addFiles(this.fileInput.current.files)
    this.setState(prevState => ({
      files: [
        ...prevState.files,
        ...files,
      ],
    }))
  }

  handleUploadStart = () => {
    this.uploader.upload()
  }

  render() {
    return (
      <Paper style={styles.root}>
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
      </Paper>
    )
  }
}
