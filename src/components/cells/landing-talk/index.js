import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import getStyles from './styles'


class LandingTalk extends Component {
  render() {
    const styles = getStyles(this.props.theme)
    return (
      <Card style={styles.root}>
        <CardContent>
          <Typography variant="headline" component="h2">
            Devices
          </Typography>
          <Typography color="textSecondary">
            Units of execution
          </Typography>
        </CardContent>
      </Card>
    )
  }
}


LandingTalk.propTypes = {
  avatar: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingTalk)
