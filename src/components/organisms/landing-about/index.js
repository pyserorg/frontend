import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

import { withStore } from 'store'
import getStyles from './styles'


class LandingAbout extends React.Component {
  render() {
    const { resolution } = this.props.store
    const styles = getStyles(this.props.theme, resolution.detail)
    return (
      <Paper style={styles.root}>
        <div style={styles.title}>Conference</div>
        <div style={styles.title.small}>
          <p style={styles.title.center}>
            Welcome to PySer 2019!
          </p>
          <br />
          <p>
            Python Serbia - PySer 2019 will be held in Novi Sad, Serbia
            on 1st of June. The conference aims to bring together
            leading local Python programmers, enthusiasts and business
            professionals to exchange and share their experiences and
            research results.
          </p>
          <br />
          <p>
            PySer is a one day, community-driven conference full of
            talks, tutorials, and other activities that strives to
            strengthen the local Python community as well as promote the
            language. All talks at the conference will be in English,
            recorded and uploaded on our YouTube channel so we can also
            promote our local community globally. Python researchers,
            practitioners and educators will have a chance to present
            and discuss the most recent innovations, trends, and concerns
            as well as practical challenges and solutions that are shaping
            the future of software development.
          </p>
          <br />
          <p>
            Our conference will also provide engaging content to
            developers of all skill levels, from professionals to
            curious amateurs. Topics will include: AI development &
            Ethics, Automation, Security and much more.
          </p>
          <br />
          <p style={styles.title.center}>
            We encourage people who have not had the chance to experience
            Python to attend our conference in 2019.The organizers will
            aim to make the conference affordable and accessible to all.
          </p>
        </div>
      </Paper>
    )
  }
}


LandingAbout.propTypes = {
  store: PropTypes.shape({
    resolution: PropTypes.shape({
      detail: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme(withStore(LandingAbout))
