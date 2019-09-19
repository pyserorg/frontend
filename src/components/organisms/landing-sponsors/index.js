import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import EryceIcon from './eryce.svg'
import FourityIcon from './fourity.svg'
import SBGenomicsIcon from './sbgenomics.svg'
import PSFIcon from './python-foundation.svg'

import getStyles from './styles'


class LandingSponsors extends Component {
  render() {
    const styles = getStyles(this.props.theme);
    return (
      <Paper style={styles.root}>
        <div style={styles.title.big}>Sponsors</div>
        <div style={styles.sponsors}>
          <div style={styles.title}>Diamond</div>
          <a
            href="https://www.python.org/psf/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={PSFIcon}
              alt="Python Software Foundation"
              style={styles.icon.diamond}
            />
          </a>
          <div style={styles.title}>Gold</div>
          <a
            href="https://www.sevenbridges.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={SBGenomicsIcon}
              alt="Seven Bridge Genomics"
              style={styles.icon.gold}
            />
          </a>
          <div style={styles.title}>Silver</div>
          <a
            href="https://www.fourity.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={FourityIcon}
              alt="Fourity"
              style={styles.icon.silver}
            />
          </a>
          <a
            href="https://eryce.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={EryceIcon}
              alt="Eryce"
              style={styles.icon.silver}
            />
          </a>
        </div>
      </Paper>
    )
  }
}


LandingSponsors.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme(LandingSponsors)
