import React from 'react'
import PropTypes from 'prop-types'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import { withStore } from 'freenit'
import initial from 'pages/landing/initial'
import TildaLogo from './logo-tilda.svg'
import getStyles from './styles'


class LandingOrganizers extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const { landing, notification } = this.props.store
    const result = await landing.send()
    if (result.status === 200) {
      notification.show('Your message was sent')
      landing.setDetail(initial)
    } else {
      notification.show(result.message)
    }
  }

  handleField = (field) => (event) => {
    const { landing } = this.props.store
    landing.setDetail({
      ...landing.detail,
      [field]: event.target.value,
    })
  }

  render() {
    const { landing, resolution } = this.props.store
    const styles = getStyles(resolution.detail)
    return (
      <Paper style={styles.root}>
        <div style={styles.organizer}>
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
        </div>
        <form style={styles.organizer} onSubmit={this.handleSubmit}>
          <h1>If you have any comments, let us know</h1>
          <TextField
            label="EMail"
            onChange={this.handleField('fromAddress')}
            value={landing.detail.fromAddress}
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Subject"
            onChange={this.handleField('subject')}
            value={landing.detail.subject}
            required
            fullWidth
          />
          <TextField
            label="Text"
            rows={4}
            onChange={this.handleField('message')}
            value={landing.detail.message}
            fullWidth
            required
            multiline
          />
          <Button
            type="submit"
            variant="outlined"
            style={styles.send}
          >
            Send
          </Button>
        </form>
      </Paper>
    );
  }
}


LandingOrganizers.propTypes = {
  store: PropTypes.shape({
    resolution: PropTypes.shape({
      detail: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}


export default withStore(LandingOrganizers)
