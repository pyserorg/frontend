import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import getStyles from './styles'
import AWSLambda from './aws-lambda.png'
import ZeroMQ from './zeromq.png'
import TGen from './tgen.jpg'


class LandingTalks extends Component {
  state = {
    over: false,
  }

  handleRedirectClick = (link) => {
    this.props.history.push(link);
  }

  handleMouseOver = (over) => {
    this.setState({ over })
  }

  render() {
    const styles = getStyles(this.props.theme, this.state.over);
    return (
      <div style={styles.root}>
        <Card style={styles.card}>
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={TGen}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                 Procedural Trees Generation with Python
              </Typography>
              <Typography component="p">
                 This very interesting talk incorporates Nemanja's
                 interests in fractal geometry and how to develop,
                 implement and improve those ideas using Python.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <a
              href="https://youtu.be/vs9GIQAD7KU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="small" color="primary">
                Watch video
              </Button>
            </a>
          </CardActions>
        </Card>
        <Card style={styles.card}>
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={AWSLambda}
              title="Ivica Kolenkaš"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                 Python and AWS Lambda – a practical guide
              </Typography>
              <Typography component="p">
                 This talk showcases a simple cryptocurrency converter
                 written in Python and hosted on AWS, highlighting
                 practical uses for several AWS services such as Lambda,
                 API Gateway, S3 and IAM among others.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <a
              href="https://youtu.be/jxkwmkNTHO0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="small" color="primary">
                Watch video
              </Button>
            </a>
          </CardActions>
        </Card>
        <Card style={styles.card}>
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={ZeroMQ}
              title="Alen Sujlkanović"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                 Building scalable APIs in Python by using ZMQ and JSON-RPC
              </Typography>
              <Typography component="p">
                 Application programming interface (API) is a set of clearly defined
                 methods of communication between various software components.
                 Modern large-scale software applications usually comprise of a
                 great number of components written in different programming
                 languages and accompanying technologies.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <a
              href="https://youtu.be/fkehJExLXx0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="small" color="primary">
                Watch video
              </Button>
            </a>
          </CardActions>
        </Card>
      </div>
    )
  }
}


LandingTalks.propTypes = {
  theme: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default withTheme()(withRouter(LandingTalks))
