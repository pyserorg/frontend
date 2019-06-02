import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import ResolutionContext from 'resolution'
import store from 'store'
import TildaLogo from './logo-tilda.svg'
import getStyles from './styles'


@observer
class LandingOrganizers extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const result = await store.landing.send()
    if (result.status === 200) {
      store.error.message = 'Your message was sent'
      store.landing.organizer.fromAddress = ''
      store.landing.organizer.subject = ''
      store.landing.organizer.message = ''
    } else {
      store.error.message = result.message
    }
    store.error.open = true
  }

  handleField = (field) => (event) => {
    store.landing.organizer[field] = event.target.value
  }

  render() {
    const styles = getStyles(this.props.resolution)
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
            value={store.landing.organizer.fromAddress}
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Subject"
            onChange={this.handleField('subject')}
            value={store.landing.organizer.subject}
            required
            fullWidth
          />
          <TextField
            label="Text"
            rows={4}
            onChange={this.handleField('message')}
            value={store.landing.organizer.message}
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
  resolution: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
}


export default (props) => (
  <ResolutionContext.Consumer>
    {resolution => <LandingOrganizers {...props} resolution={resolution} />}
  </ResolutionContext.Consumer>
)
