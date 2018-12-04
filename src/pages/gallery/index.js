import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import Gall from 'react-photo-gallery'
import Lightbox from 'react-images'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import { getCookie } from 'utils'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  error: state.gallery.error,
  album: state.gallery.result,
  status: state.gallery.status,
})


class Gallery extends React.Component {
  state = {
    files: [],
    isLigthboxOpen: false,
    currentPhoto: 1,
  }

  fileInput = React.createRef()

  uploader = new Resumable({
    target: '/api/v0/gallery',
    testChunks: false,
    headers: {
      'X-CSRF-TOKEN': getCookie('csrf_access_token'),
    },
  })

  componentWillMount() {
    this.props.requestTitle('Gallery')
    this.props.requestGallery(
      this.props.match.params.year,
      'main',
    )
  }

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

  openLightbox = (event, photo) => {
    this.setState({
      isLigthboxOpen: true,
      currentPhoto: photo.index,
    })
  }

  closeLightbox = () => this.setState({ isLigthboxOpen: false })

  nextPhoto = () => this.setState(prevState => ({ currentPhoto: prevState.currentPhoto + 1 }))

  prevPhoto = () => this.setState(prevState => ({ currentPhoto: prevState.currentPhoto - 1 }))

  render() {
    const { prefix, name } = this.props.album
    const { year } = this.props.match.params
    const photos = this.props.album.files.map(picture => ({
      src: `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    return (
      <Template>
        <Paper style={styles.root}>
          Gallery
          <Gall
            photos={photos}
            onClick={this.openLightbox}
            columns={6}
          />
          <Lightbox
            images={photos}
            isOpen={this.state.isLigthboxOpen}
            onClose={this.closeLightbox}
            onClickNext={this.nextPhoto}
            onClickPrev={this.prevPhoto}
            currentImage={this.state.currentPhoto}
          />
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
      </Template>
    )
  }
}


Gallery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestTitle: PropTypes.func.isRequired,
  requestGallery: PropTypes.func.isRequired,
  album: PropTypes.shape({
    files: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      filename: PropTypes.string.isRequired,
    })),
    id: PropTypes.number.isRequired,
    mainEvent: PropTypes.shape({
      id: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    prefix: PropTypes.string.isRequired,
  }),
}


Gallery.defaultProps = {
  album: {
    id: 0,
    name: '',
    files: [],
    pages: 0,
    total: 0,
    prefix: '',
  },
}


export default connect(mapStateToProps, { ...titleActions, ...actions })(
  Gallery,
)
