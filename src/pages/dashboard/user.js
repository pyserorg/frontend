import React, { Component } from 'react'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import store from 'store'
import TalkBox from 'components/organisms/talk-box'
import styles from './styles'


@observer
class UserDashboard extends Component {
  state = {
    edit: null,
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    twitter: '',
    facebook: '',
  }

  componentWillMount() {
    store.talk.fetchAllUser()
  }

  handleEditName = () => {
    this.setState({
      edit: 'name',
      firstName: store.me.detail.firstName,
      lastName: store.me.detail.lastName,
    })
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  submitName = () => {
    store.me.edit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    })
    this.setState({ edit: null })
  }

  handleEdit = (field) => () => {
    this.setState({
      edit: field,
      [field]: store.me.detail[field],
    })
  }

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleSubmit = (field) => () => {
    store.me.edit({
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
            {store.me.detail.firstName}
            &nbsp;
            {store.me.detail.lastName}
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
          <span
            onClick={this.handleEdit('email')}
            role="presentation"
          >
            {store.me.detail.email}
          </span>
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
          <span
            onClick={this.handleEdit('twitter')}
            role="presentation"
          >
            {store.me.detail.twitter}
          </span>
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
          <span
            onClick={this.handleEdit('facebook')}
            role="presentation"
          >
            {store.me.detail.facebook}
          </span>
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
          <span
            onClick={this.handleEdit('bio')}
            role="presentation"
          >
            {store.me.detail.bio}
          </span>
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
          {store.talk.list.data.map(talk => (
            <div style={styles.talks.box}>
              <TalkBox key={talk.id} talk={talk} nouser />
            </div>
          ))}
        </div>
      </div>
    )
  }
}


UserDashboard.propTypes = {
}


export default UserDashboard
