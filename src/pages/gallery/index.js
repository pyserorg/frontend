import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import InfiniteScroll from 'react-infinite-scroller'
import Gall from 'react-photo-gallery'
import Lightbox from 'react-images'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import GalleryUpload from 'components/organisms/gallery-upload'
import { API_ROOT } from 'utils'
import store from 'store'
import styles from './styles'


@observer
class Gallery extends React.Component {
  state = {
    page: 1,
    open: false,
    isLigthboxOpen: false,
    currentPhoto: 1,
  }

  componentWillMount() {
    store.title.title = 'Gallery'
    store.gallery.fetch(
      'main',
      this.props.match.params.year,
    )
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
      if (prevState.currentPhoto + 1 >= store.gallery.detail.files.length) {
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
    store.gallery.detail.files = [...store.gallery.detail.files, ...files]
    this.setState(prevState => ({ open: false }))
  }

  loadMore = () => {
    if (this.state.page >= store.gallery.detail.album.pages) {
      return
    }
    this.setState(prevState => {
      const nextPage = prevState.page + 1
      this.requestGallery(
        'main',
        this.props.match.params.year,
        nextPage,
      )
      return { page: nextPage }
    })
  }

  render() {
    const { prefix, name } = store.gallery.detail
    const { year } = this.props.match.params
    const photos = store.gallery.detail.files.map(picture => ({
      src: picture.src
        ? picture.src
        : `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    const uploadButton = store.auth.auth
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
            hasMore={this.state.page < store.gallery.detail.pages}
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default Gallery
