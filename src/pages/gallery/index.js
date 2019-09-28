import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

// Components
import Fab from '@material-ui/core/Fab'
import Gall from 'react-photo-gallery'
import GalleryUpload from 'components/organisms/gallery-upload'
import InfiniteScroll from 'react-infinite-scroller'
import Paper from '@material-ui/core/Paper'
import YearSwitch from 'components/organisms/year-switch'

// Icons
import AddIcon from '@material-ui/icons/Add'

import Template from 'templates/default'
import { API_ROOT } from 'utils'
import store from 'store'
import styles from './styles'


@observer
class Gallery extends React.Component {
  state = {
    page: 0,
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
      if (prevState.currentPhoto + 1 >= store.gallery.list.files.length) {
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
    store.gallery.list.files = [...store.gallery.list.files, ...files]
    this.setState({ open: false })
  }

  loadMore = () => {
    if (this.state.page > store.gallery.list.pages) {
      return
    }
    this.setState(prevState => {
      const nextPage = prevState.page + 1
      store.gallery.fetchAggregate(
        'main',
        this.props.match.params.year,
        nextPage,
      )
      return { page: nextPage }
    })
  }

  handleYearChange = () => {
    store.gallery.fetch('main', store.event.detail.year)
    this.props.history.push(`/${store.event.detail.year}/gallery`)
  }

  render() {
    const { prefix, name } = store.gallery.list
    const { year } = this.props.match.params
    const photos = store.gallery.list.files.data.map(picture => ({
      src: picture.src
        ? picture.src
        : `${prefix}/${year}/${name}/${picture.filename}`,
      height: styles.picture.height,
      width: styles.picture.width,
    }))
    const uploadButton = store.me.detail.admin
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
          <YearSwitch onChange={this.handleYearChange} />
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.page < store.gallery.list.files.pages}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {uploadButton}
            <Gall
              photos={photos}
              onClick={this.openLightbox}
              columns={6}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default withRouter(Gallery)
