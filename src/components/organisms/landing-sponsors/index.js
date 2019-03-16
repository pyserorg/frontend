import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';

import getStyles from './styles'


class LandingSponsors extends Component {
  render() {
    const styles = getStyles(this.props.theme);
    return (
      <Paper style={styles.root}>
        <div style={styles.title.big}>Sponsors</div>
        <div style={styles.title.small}>
          If you want to sponsor this conference 
          checkout our Call for Sponsors page.
        </div>
        <Button style={styles.button} variant="contained" color="primary">
          CfS
        </Button>
      </Paper>
    )
  }
}


LandingSponsors.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingSponsors)
