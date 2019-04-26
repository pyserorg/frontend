import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import EryceIcon from './eryce.svg'

import getStyles from './styles'


class LandingSponsors extends Component {
  render() {
    const styles = getStyles(this.props.theme);
    return (
      <Paper style={styles.root}>
        <div style={styles.title.big}>Sponsors</div>
        <div style={styles.sponsors}>
          <div style={styles.title}>Silver</div>
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


export default withTheme()(LandingSponsors)
