import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Gall from 'react-photo-gallery'
import Lightbox from 'react-images'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import errorActions from 'templates/empty/actions'
import GalleryUpload from 'components/organisms/gallery-upload'
import { API_ROOT } from 'utils'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  auth: state.auth.state,
  album: state.gallery.result,
  error: state.gallery.error,
  status: state.gallery.status,
})


class Gallery extends React.Component {
  state = {
    files: [],
    page: 1,
    open: false,
    isLigthboxOpen: false,
    currentPhoto: 1,
  }

  componentWillMount() {
    this.props.requestTitle('Gallery')
    this.props.requestGallery(
      this.props.match.params.year,
      'main',
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 200) {
      this.setState(prevState => ({
        files: [...prevState.files, ...nextProps.album.files],
      }))
      this.props.requestGalleryReset()
    } else if (nextProps.status >= 400) {
      this.props.requestError(this.props.error)
      this.props.requestGalleryReset()
    }
  }

  openLightbox = (event, photo) => {
    this.setState({
      isLigthboxOpen: true,
      currentPhoto: photo.index,
    })
  }

  closeLightbox = () => this.setState({ isLigthboxOpen: false })

  nextPhoto = () => this.setState(
    prevState => {
      if (prevState.currentPhoto + 1 >= prevState.files.length) {
        this.loadMore()
      }
      return {
        currentPhoto: prevState.currentPhoto + 1,
      }
    },
  )

  prevPhoto = () => this.setState(
    prevState => ({ currentPhoto: prevState.currentPhoto - 1 }),
  )

  handleOpenUpload = () => {
    this.setState({ open: true })
  }

  handleCloseUpload = (files) => {
    this.setState(prevState => ({
      files: [...prevState.files, ...files],
      open: false,
    }))
  }

  loadMore = () => {
    if (this.state.page >= this.props.album.pages) {
      return
    }
    this.setState(prevState => {
      const nextPage = prevState.page + 1
      this.requestGallery(
        this.props.match.params.year,
        'main',
        nextPage,
      )
      return { page: nextPage }
    })
  }

  render() {
    const { prefix, name } = this.props.album
    const { year } = this.props.match.params
    const photos = this.state.files.map(picture => ({
      src: picture.src
        ? picture.src
        : `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    const uploadButton = this.props.auth
      ? (
        <Fab
          color="primary"
          onClick={this.handleOpenUpload}
          style={styles.upload.button}
        >
          <AddIcon />
        </Fab>
      )
      : ''
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.page < this.props.album.pages}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {uploadButton}
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
            <GalleryUpload
              open={this.state.open}
              target={`${API_ROOT}/gallery/upload/main/${year}`}
              onClose={this.handleCloseUpload}
            />
          </InfiniteScroll>
        </Paper>
      </Template>
    )
  }
}


Gallery.propTypes = {
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
  auth: PropTypes.bool,
  error: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestGallery: PropTypes.func.isRequired,
  requestGalleryReset: PropTypes.func.isRequired,
  requestError: PropTypes.func.isRequired,
  requestTitle: PropTypes.func.isRequired,
  status: PropTypes.number,
}


Gallery.defaultProps = {
  album: {
    id: 0,
    name: '',
    files: [],
    pages: 1,
    total: 0,
    prefix: '',
  },
}


export default connect(
  mapStateToProps,
  { ...errorActions, ...titleActions, ...actions },
)(Gallery)
