import React from 'react'
import PropTypes from 'prop-types'
import Gall from 'react-photo-gallery'
import Lightbox from 'react-images'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import styles from './styles'


class Gallery extends React.Component {
  state = {
    isLigthboxOpen: false,
    currentPhoto: 1,
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
    return (
      <Template>
        <Paper style={styles.root}>
          <Gall
            photos={this.props.photos}
            onClick={this.openLightbox}
            columns={6}
          />
          <Lightbox
            images={this.props.photos}
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
  photos: PropTypes.arrayOf(PropTypes.shape({
    filename: PropTypes.string.isRequired,
  })),
}


Gallery.defaultProps = {
  photos: [],
}


export default Gallery
