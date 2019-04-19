import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import getStyles from './styles'
import pyserLogo from './pyser-logo.svg'


class LandingInfo extends Component {
  render() {
    const height = this.props.height
      ? this.props.height
      : 'calc(100vh - 64px)'
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
        <Link to="/cfp" style={styles.tickets.link}>
          <Paper style={styles.tickets}>
            Call for Papers
          </Paper>
        </Link>
      </div>
    )
  }
}


LandingInfo.propTypes = {
  height: PropTypes.number,
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingInfo)
