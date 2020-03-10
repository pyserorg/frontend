import React from 'react'
import { errors, withStore } from 'freenit'

// Components
import {
  Button,
  TextField,
  Tooltip,
} from '@material-ui/core'

import {
  TalkBox,
} from 'components'
import styles from './styles'


class UserDashboard extends React.Component {
  state = {
    edit: null,
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    twitter: '',
    facebook: '',
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { event, notification, talk, profile } = this.props.store
    const [eventresp, profileresp] = await Promise.all([
      event.fetchAll(),
      profile.fetch(),
    ])
    if (eventresp.ok) {
      if (eventresp.total > 0) {
        talk.fetchAllUser()
      }
    } else {
      const error = errors(eventresp)
      notification.show(error.message)
    }
    if (!profileresp.ok) {
      const error = errors(profileresp)
      notification.show(error.message)
    }
  }

  handleEditName = () => {
    const profile = this.props.store.profile.detail
    this.setState({
      edit: 'name',
      firstName: profile.firstName,
      lastName: profile.lastName,
    })
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  submitName = () => {
    this.props.store.profile.edit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    })
    this.setState({ edit: null })
  }

  handleEdit = (field) => () => {
    this.setState({
      edit: field,
      [field]: this.props.store.profile.detail[field],
    })
  }

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleSubmit = (field) => () => {
    this.props.store.profile.edit({
      [field]: this.state[field],
    })
    this.setState({ edit: null })
  }

  render() {
    const name = this.state.edit === 'name'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.firstName}
              label="First Name"
              onChange={this.handleFieldChange('firstName')}
            />
          </div>
          <div>
            <TextField
              value={this.state.lastName}
              label="Last Name"
              onChange={this.handleFieldChange('lastName')}
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.submitName}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <h1
            onClick={this.handleEditName}
            role="presentation"
          >
            {this.props.store.profile.detail.firstName}
            &nbsp;
            {this.props.store.profile.detail.lastName}
          </h1>
        </Tooltip>
      )
    const email = this.state.edit === 'email'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.email}
              label="Email"
              onChange={this.handleFieldChange('email')}
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('email')}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <div
            onClick={this.handleEdit('email')}
            role="presentation"
            data-id="email"
          >
            {this.props.store.profile.detail.email}
          </div>
        </Tooltip>
      )
    const twitter = this.state.edit === 'twitter'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.twitter}
              label="Twitter"
              onChange={this.handleFieldChange('twitter')}
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('twitter')}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <div
            style={styles.twitter}
            onClick={this.handleEdit('twitter')}
            role="presentation"
          >
            {this.props.store.profile.detail.twitter}
          </div>
        </Tooltip>
      )
    const facebook = this.state.edit === 'facebook'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.facebook}
              label="Facebook"
              onChange={this.handleFieldChange('facebook')}
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('facebook')}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <div
            style={styles.facebook}
            onClick={this.handleEdit('facebook')}
            role="presentation"
          >
            {this.props.store.profile.detail.facebook}
          </div>
        </Tooltip>
      )
    const bio = this.state.edit === 'bio'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.bio}
              label="Biography"
              onChange={this.handleFieldChange('bio')}
              multiline
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('bio')}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <div
            onClick={this.handleEdit('bio')}
            role="presentation"
          >
            {this.props.store.profile.detail.bio}
          </div>
        </Tooltip>
      )
    return (
      <div style={styles.content}>
        <div style={styles.user}>
          {name}
          {email}
          {twitter}
          {facebook}
          {bio}
        </div>
        <div style={styles.talks}>
          {this.props.store.talk.list.data.map(talk => (
            <div key={talk.id} style={styles.talks.box}>
              <TalkBox talk={talk} nouser />
            </div>
          ))}
        </div>
      </div>
    )
  }
}


export default withStore(UserDashboard)
