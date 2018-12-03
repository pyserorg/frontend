import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Gall from 'react-photo-gallery'
import Lightbox from 'react-images'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  error: state.gallery.error,
  album: state.gallery.result,
  status: state.gallery.status,
})


class Gallery extends React.Component {
  state = {
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
