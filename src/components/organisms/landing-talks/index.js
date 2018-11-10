import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Talk from 'components/cells/landing-talk'
import getStyles from './styles'
import TensorFlow from './tensor-flow.jpg'
import AWSLambda from './aws-lambda.png'
import ZeroMQ from './zeromq.png'


class LandingTalks extends Component {
  state = {
    over: false,
  }

  handleRedirectClick = (link) => {
    this.context.router.history.push(link);
  }

  handleMouseOver = (over) => {
    this.setState({ over })
  }

  render() {
    const styles = getStyles(this.props.theme, this.state.over);
    return (
      <div style={styles.root}>
        <div style={styles.talks}>
          <Talk
            title="Introduction to neural networks with Keras and Tensorflow"
            name="Nemanja Milosević"
            avatar={TensorFlow}
          >
            This workshop is 90 minutes and it will help you get started with
            machine learning and neural networks. You will learn how neural
            networks work and are they used for tasks like image and text
            classification, financial predictions etc. No prior machine
            learning knowledge is needed
          </Talk>
          <Talk
            title="Python and AWS Lambda – a practical guide"
            name="Ivica Kolenkaš"
            avatar={AWSLambda}
          >
            This talk showcases a simple cryptocurrency converter written in
            Python and hosted on AWS, highlighting practical uses for several
            AWS services such as Lambda, API Gateway, S3 and IAM among others
          </Talk>
          <Talk
            title="Building scalable APIs in Python by using ZMQ and JSON-RPC"
            name="Alen Sujlkanović"
            avatar={ZeroMQ}
          >
            Application programming interface (API) is a set of clearly defined
            methods of communication between various software components.
            Modern large-scale software applications usually comprise of a
            great number of components written in different programming
            languages and accompanying technologies
          </Talk>
        </div>
        <Paper
          onClick={() => this.handleRedirectClick('/talks')}
          onMouseEnter={() => this.handleMouseOver(true)}
          onMouseLeave={() => this.handleMouseOver(false)}
          style={styles.title}
        >
          And much more
        </Paper>
      </div>
    )
  }
}


LandingTalks.propTypes = {
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(LandingTalks)
