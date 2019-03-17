import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import TildaLogo from './logo-tilda.svg';
import styles from './styles';


class LandingOrganizers extends Component {
  render() {
    return (
      <Paper style={styles.root}>
        <div style={styles.title}>Organizers</div>
        <div style={styles.logos}>
          <a
            href="https://tilda.center/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={styles.logo} src={TildaLogo} alt="" />
          </a>
        </div>
      </Paper>
    );
  }
}


LandingOrganizers.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingOrganizers)
