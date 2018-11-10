import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import getStyles from './styles'


class LandingTalk extends Component {
  render() {
    const styles = getStyles(this.props.theme)
    return (
      <Card style={styles.root}>
        <CardContent>
          <CardMedia image={this.props.avatar} style={styles.media} />
          <Typography variant="headline" component="h3">
            {this.props.title}
          </Typography>
          <Typography color="textSecondary" style={styles.name}>
            {this.props.name}
          </Typography>
          <Typography color="textSecondary">
            {this.props.children}
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
