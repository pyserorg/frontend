import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStore } from 'freenit'

// Components
import {
  Dialog,
  Fab,
  Paper,
} from '@material-ui/core'
import Gall from 'react-photo-gallery'

import {
  GalleryUpload,
  YearSwitch,
} from 'components'
import InfiniteScroll from 'react-infinite-scroller'

// Icons
import AddIcon from '@material-ui/icons/Add'

import Template from 'templates/default/detail'
import styles from './styles'


class Gallery extends React.Component {
  state = {
    page: 0,
    open: false,
    carouselOpen: false,
    currentPhoto: 0,
    hoverPrevious: false,
    hoverNext: false,
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    this.props.store.gallery.fetch(
      'main',
      this.props.match.params.year,
    )
  }

  openCarousel = (event, photo) => {
    this.setState({
      carouselOpen: true,
      currentPhoto: photo.index,
    })
  }

  closeCarousel = () => this.setState({ carouselOpen: false })

  nextPhoto = async () => {
    const { gallery } = this.props.store
    if (this.state.currentPhoto + 1 >= gallery.detail.files.data.length) {
      await this.loadMore()
    }
    if (this.state.currentPhoto + 1 >= gallery.detail.files.data.length) {
      return
    }
    this.setState(prevState => {
      return { currentPhoto: prevState.currentPhoto + 1 }
    })
  }

  prevPhoto = () => this.setState(
    prevState => {
      if (prevState.currentPhoto > 0) {
        return { currentPhoto: prevState.currentPhoto - 1 }
      }
    }
  )

  handleOpenUpload = () => {
    this.setState({ open: true })
  }

  handleCloseUpload = (files) => {
    const { gallery } = this.props.store
    const allFiles = [...gallery.detail.files.data, ...files]
    const data = {
      ...gallery.detail,
      files: {
        data: allFiles,
        pages: gallery.detail.files.pages,
        total: gallery.detail.files.total + files.length,
      }
    }
    gallery.setDetail(data)
    this.setState({ open: false })
  }

  loadMore = async () => {
    const { gallery } = this.props.store
    if (this.state.page >= gallery.detail.files.pages) {
      return
    }
    const nextPage = this.state.page + 1
    await gallery.fetchAggregate(
      'main',
      this.props.match.params.year,
      nextPage,
    )
    this.setState({ page: nextPage })
  }

  handleYearChange = () => {
    const { gallery, event } = this.props.store
    gallery.fetch('main', event.detail.year)
    this.props.history.push(`/${event.detail.year}/gallery`)
  }

  handleKey = (event) => {
    if (event.key === 'ArrowRight') {
      this.nextPhoto()
    } else if (event.key === 'ArrowLeft') {
      this.prevPhoto()
    } else if (event.key === 'Escape') {
      this.closeCarousel()
    }
  }

  handleMouseOver = (item) => () => {
    this.setState({ [`hover${item}`]: true })
  }

  handleMouseOut = (item) => () => {
    this.setState({ [`hover${item}`]: false })
  }

  render() {
    const { gallery, profile } = this.props.store
    const { prefix, name, files } = gallery.detail
    const { year } = this.props.match.params
    const photos = files.data.map(picture => ({
      src: picture.src
        ? picture.src
        : `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    const uploadButton = profile.detail.admin
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
    const image = photos.length > 0
      ? (
        <img
          alt="gallery"
          style={styles.carousel.image}
          src={photos[this.state.currentPhoto].src}
        />
      )
      : null
    const stylePrevious = this.state.hoverPrevious
      ? ({
        ...styles.carousel.navigation,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }) : styles.carousel.navigation
    const styleNext = this.state.hoverNext
      ? ({
        ...styles.carousel.navigation,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }) : styles.carousel.navigation
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <YearSwitch onChange={this.handleYearChange} />
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.page < gallery.detail.files.pages}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {uploadButton}
            <Gall
              photos={photos}
              onClick={this.openCarousel}
              columns={6}
            />
            <GalleryUpload
              open={this.state.open}
              target={`${window.API_ROOT}/gallery/album/main/${year}`}
              onClose={this.handleCloseUpload}
            />
          </InfiniteScroll>
          <Dialog
            fullScreen
            open={this.state.carouselOpen}
            onClose={this.closeCarousel}
            onKeyDown={this.handleKey}
            PaperProps={{ style: styles.dialog }}
          >
            <div style={styles.carousel}>
              <div style={styles.carousel.content}>
                <div
                  style={stylePrevious}
                  onClick={this.prevPhoto}
                  onMouseOver={this.handleMouseOver('Previous')}
                  onMouseOut={this.handleMouseOut('Previous')}
                >
                  &lt;
                </div>
                {image}
                <div
                  style={styles.carousel.close}
                  onClick={this.closeCarousel}
                  onMouseOver={this.handleMouseOver('Next')}
                  onMouseOut={this.handleMouseOut('Next')}
                >
                  x
                </div>
                <div
                  style={styleNext}
                  onClick={this.nextPhoto}
                  onMouseOver={this.handleMouseOver('Next')}
                  onMouseOut={this.handleMouseOut('Next')}
                >
                  &gt;
                </div>
              </div>
            </div>
          </Dialog>
        </Paper>
      </Template>
    )
  }
}


Gallery.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default withRouter(withStore(Gallery))
