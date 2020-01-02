import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import getStyles from './styles'
import pyserLogo from './pyser-logo.svg'


class LandingInfo extends Component {
  render() {
    const height = this.props.height || 'calc(100vh - 64px)'
    const styles = getStyles(this.props.theme, height);
    return (
      <div style={styles.root}>
        <img src={pyserLogo} alt="PySer Logo" style={styles.logo} />
        <div style={styles.small}>
          Novi Sad, Serbia, 01. June 2019.
        </div>
        <div style={styles.small}>
          <a
            style={styles.link}
            href="http://hotelnovisad.co.rs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hotel Novi Sad
          </a>
        </div>
        <a
          href="https://www.youtube.com/watch?v=sTQaCm_ax8Q&list=PLnRmeeuhue8fc0XAhmOIIxe3-5ZVmses6"
          style={styles.tickets.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Paper style={styles.tickets}>
            Watch Videos
          </Paper>
        </a>
      </div>
    )
  }
}


LandingInfo.propTypes = {
  height: PropTypes.number,
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme(LandingInfo)
