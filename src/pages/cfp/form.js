import React from 'react'
import PropTypes from 'prop-types'
import { withStore } from 'freenit'
import { errors } from 'utils'

// Components
import {
  Button,
  MenuItem,
  Paper,
  TextField,
} from '@material-ui/core'

import Template from 'templates/default/detail'
import styles from './styles'


class CfP extends React.Component {
  state = {
    description: '',
    duration: 30,
    submitting: false,
    title: '',
    type: 'presentations',
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ submitting: true })
    const {
      description,
      duration,
      submitting,
      title,
      type,
    } = this.state
    const data = {
      description,
      duration,
      submitting,
      title,
      hall: type,
    }
    const response = await this.props.store.cfp.send(data)
    this.setState({ submitting: false })
    if (response.ok) {
      if (this.props.store.auth.detail.ok) {
        this.props.history.push(`/cfp/${response.talk.id}`)
      } else {
        this.props.store.notification.show('Your talk was submitted')
      }
    } else {
      const error = errors(response)
      this.props.store.notification.show(error.message)
    }
  }

  render() {
    const form = this.props.store.auth.detail.ok
      ? (
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <TextField
            required
            autoFocus
            label="Title"
            onChange={this.handleFieldChange('title')}
            value={this.state.title}
          />
          <TextField
            required
            multiline
            label="Description"
            onChange={this.handleFieldChange('description')}
            value={this.state.description}
            rows={6}
          />
          <TextField
            label="Duration"
            select
            required
            value={this.state.duration}
            onChange={this.handleFieldChange('duration')}
            margin="normal"
          >
            <MenuItem value={30}>
              30
            </MenuItem>
            <MenuItem value={45}>
              45
            </MenuItem>
            <MenuItem value={60}>
              60
            </MenuItem>
            <MenuItem value={90}>
              90
            </MenuItem>
          </TextField>
          <TextField
            select
            required
            label="Type"
            value={this.state.type}
            onChange={this.handleFieldChange('type')}
            margin="normal"
          >
            <MenuItem value="presentations">
              presentation
            </MenuItem>
            <MenuItem value="workshops">
              workshop
            </MenuItem>
          </TextField>
          <div style={styles.talk}>
            <Button type="submit" color="primary" variant="outlined">
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <div>
          Please, register or login first!
        </div>
      )
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>Call for Papers</h1>
          <div style={styles.subtitle}>Open until 5th of May 2019</div>
          {form}
        </Paper>
      </Template>
    )
  }
}


CfP.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default withStore(CfP)
