import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'

import PythonFoundationIcon from './python-foundation.svg'
import ViselioIcon from './viselio.svg'
import CodeConsultingIcon from './codeconsulting.svg'
import VegaIcon from './vega.svg'
import TyphoonHilIcon from './typhoon-hil.svg'

import getStyles from './styles'


class LandingSponsors extends Component {
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
        <div style={styles.title.big}>Sponsors</div>
        <div style={styles.sponsors}>
          <div style={styles.title}>Diamond</div>
          <img
            src={PythonFoundationIcon}
            alt="Python Foundation"
            style={styles.icon}
          />
          <div style={styles.title}>Gold</div>
          <div style={styles.element}>
            <img
              src={CodeConsultingIcon}
              alt="CodeConsulting"
              style={styles.icon.gold}
            />
            <img
              src={VegaIcon}
              alt="VegaIT"
              style={{
                ...styles.icon.gold,
                maxWidth: 400,
              }}
            />
          </div>
          <div style={styles.title}>Silver</div>
          <img
            src={TyphoonHilIcon}
            alt="TyphoonHil"
            style={styles.icon.silver}
          />
          <div style={styles.title}>Bronze</div>
          <img
            src={ViselioIcon}
            alt="Viselio"
            style={styles.icon.bronze}
          />
        </div>
      </Paper>
    )
  }
}


export default LandingSponsors;

