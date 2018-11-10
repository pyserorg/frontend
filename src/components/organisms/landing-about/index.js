import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import getStyles from './styles'


class LandingAbout extends Component {
  render() {
    const styles = getStyles(this.props.theme);
    return (
      <Paper style={styles.root}>
        <div style={styles.title}>Conference</div>
        <div style={styles.title.small}>
          <p style={styles.title.center}>
            PySer is a one day, community-driven conference full of talks,
            tutorials, and other activities.
          </p>
          <br />

          <p>
            All talks at the conference will provide engaging content to
            developers of all skill levels, from professionals to curious
            amateurs. Topics will include very latest research, development
            and trends.
          </p>
          <br />

          <p style={styles.title.center}>
            We encourage people who have not had the chance to experience Python
            to attend our conference in 2018.
          </p>
        </div>
      </Paper>
    )
  }
}


LandingAbout.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingAbout)
