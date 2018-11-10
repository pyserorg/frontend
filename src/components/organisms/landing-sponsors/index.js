import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import PythonFoundationIcon from './python-foundation.svg'
import ViselioIcon from './viselio.svg'
import CodeConsultingIcon from './codeconsulting.svg'
import VegaIcon from './vega.svg'
import TyphoonHilIcon from './typhoon-hil.svg'

import getStyles from './styles'


class LandingSponsors extends Component {
  render() {
    const styles = getStyles(this.props.theme);
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


LandingSponsors.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingSponsors)
