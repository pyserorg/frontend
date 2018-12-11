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
    target: `/api/v0/gallery/album/main/${this.props.match.params.year}`,
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

  handleFileChange = (event) => {
    const reader = new FileReader()
    for (let i = 0; i < event.target.files.length; ++i) {
      const file = event.target.files[i]
      reader.onload = (e) => this.setState(
        prevState => {
          console.log(e.target, file)
          return {
            files: [
              ...prevState.files,
              {
                data: e.target.result,
                uniqueIdentifier: file.uniqueIdentifier,
              },
            ],
          }
        },
      )
      reader.readAsDataURL(event.target.files[i])
    }
    this.uploader.addFiles(event.target.files)
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

  nextPhoto = () => this.setState(
    prevState => ({ currentPhoto: prevState.currentPhoto + 1 }),
  )

  prevPhoto = () => this.setState(
    prevState => ({ currentPhoto: prevState.currentPhoto - 1 }),
  )

  render() {
    const filePreview = this.state.files.map(file => (
      <img
        key={file.uniqueIdentifier}
        src={file.data}
        style={{ height: 100, width: 100 }}
        alt=""
      />
    ))
    const { prefix, name } = this.props.album
    const { year } = this.props.match.params
    const photos = this.props.album.files.map(picture => ({
      src: `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <Button onClick={this.handleUpload}>
            Select files
          </Button>
          <Button onClick={this.handleUploadStart}>
            Start upload
          </Button>
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
          <input
            ref={this.fileInput}
            type="file"
            accept="image/*"
            style={styles.file.input}
            multiple
            onChange={this.handleFileChange}
          />
          {filePreview}
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
