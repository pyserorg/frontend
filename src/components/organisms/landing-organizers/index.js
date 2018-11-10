import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import getStyles from './styles';
import TildaLogo from './logo-tilda.svg';
import PythonBelgradeLogo from './logo-python-belgrade.svg';


class LandingOrganizers extends Component {
  static propTypes = {
    height: PropTypes.number,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    const height = this.props.height
                 ? this.props.height
                 : `calc(100vh - ${this.context.muiTheme.appBar.height}px)`;
    const styles = getStyles(this.context.muiTheme, height);
    return (
      <Paper style={styles.root}>
        <div style={styles.title}>Organizers & Partners</div>
        <div style={styles.logos}>
          <a
            href="https://tilda.center/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={styles.logo} src={TildaLogo} alt="" />
          </a>
          <a
            href="http://pythonbelgrade.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img style={styles.logo} src={PythonBelgradeLogo} alt="" />
          </a>
        </div>
      </Paper>
    );
  }
}


export default LandingOrganizers;

