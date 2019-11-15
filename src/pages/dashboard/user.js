import React from 'react'
import { withStore } from 'store'
import { errors } from 'utils'

// Components
import {
  Button,
  TextField,
  Tooltip,
} from '@material-ui/core'

import TalkBox from 'components/organisms/talk-box'
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
    const { notification, talk } = this.props.store
    const response = await talk.fetchAllUser()
    if (!response.ok) {
      notification.show(errors(response).message)
    }
  }

  handleEditName = () => {
    const me = this.props.store.me.detail
    this.setState({
      edit: 'name',
      firstName: me.firstName,
      lastName: me.lastName,
    })
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  submitName = () => {
    this.props.store.me.edit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    })
    this.setState({ edit: null })
  }

  handleEdit = (field) => () => {
    this.setState({
      edit: field,
      [field]: this.props.store.me.detail[field],
    })
  }

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleSubmit = (field) => () => {
    this.props.store.me.edit({
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
            {this.props.store.me.detail.firstName}
            &nbsp;
            {this.props.store.me.detail.lastName}
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
          >
            {this.props.store.me.detail.email}
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
            {this.props.store.me.detail.twitter}
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
            {this.props.store.me.detail.facebook}
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
            {this.props.store.me.detail.bio}
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
