import React from 'react'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Avatar,
  Button,
  TextField,
} from '@material-ui/core'
import {
  GalleryUpload,
} from 'components'

import Template from 'templates/default/detail'
import styles from './styles'


class Profile extends React.Component {
  state = {
    avatar: '',
    biogaphy: '',
    edited: false,
    email: '',
    facebook: '',
    firstName: '',
    lastName: '',
    twitter: '',
    open: false,
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  initState = (data = this.props.store.profile.detail) => {
    this.setState({
      avatar: data.avatar || '',
      biography: data.biography || '',
      email: data.email || '',
      facebook: data.facebook || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      twitter: data.twitter || '',
    })
  }

  fetch = async () => {
    const { match, store } = this.props
    const response = match.params.id === undefined
      ? await store.profile.fetch()
      : await store.user.fetch(match.params.id)
    if (!response.ok) {
      const error = errors(response)
      store.notification.show(error.message)
    } else {
      this.initState(response)
    }
  }

  handleField = (field) => (event) => {
    this.setState({
      edited: field,
      [field]: event.target.value,
    })
  }

  handleFieldCancel = () => {
    this.setState({ edited: false })
    this.initState()
  }

  handleSubmit = (field) => async () => {
    const { store, match } = this.props
    const { profile, notification, user } = store
    const response = match.params.id === undefined
      ? await profile.edit({ [field]: this.state[field] })
      : await user.edit(match.params.id, { [field]: this.state[field] })
    if (!response.ok) {
      notification.show('Error editing profile')
    } else {
      this.setState({ edited: false })
    }
  }

  avatarUpload = () => {
    this.setState({ open: true })
  }

  avatarUploadCancel = () => {
    this.setState({ open: false })
  }

  avatarUploadSuccess = async (files) => {
    const [avatar] = files
    this.setState({ avatar: avatar.src })
  }

  render() {
    return (
      <Template style={{}}>
        <div style={styles.root}>
          <div style={styles.content}>
            <GalleryUpload
              open={this.state.open}
              target={`${window.rest.API_ROOT}/gallery/album/avatars`}
              onClose={this.avatarUploadCancel}
              onSuccess={this.avatarUploadSuccess}
            />
            <Avatar
              style={styles.avatar}
              onClick={this.avatarUpload}
              src={this.state.avatar}
            />
            <div style={styles.inputs}>
              <TextField
                fullWidth
                label="email"
                value={this.state.email}
                onChange={this.handleField('email')}
                type="email"
              />
              {this.state.edited === 'email'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('email')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
              <TextField
                fullWidth
                label="first name"
                value={this.state.firstName}
                onChange={this.handleField('firstName')}
              />
              {this.state.edited === 'firstName'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('firstName')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
              <TextField
                fullWidth
                label="last name"
                value={this.state.last}
                onChange={this.handleField('lastName')}
              />
              {this.state.edited === 'lastName'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('lastName')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
              <TextField
                fullWidth
                label="facebook"
                value={this.state.facebook}
                onChange={this.handleField('facebook')}
              />
              {this.state.edited === 'facebook'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('facebook')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
              <TextField
                fullWidth
                label="twitter"
                value={this.state.twitter}
                onChange={this.handleField('twitter')}
              />
              {this.state.edited === 'twitter'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('twitter')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
              <TextField
                fullWidth
                multiline
                label="biography"
                value={this.state.biography}
                onChange={this.handleField('biography')}
              />
              {this.state.edited === 'biography'
                ? (
                  <div style={styles.actions}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.actions.button}
                      onClick={this.handleSubmit('biography')}
                    >
                      OK
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      style={styles.actions.button}
                      onClick={this.handleFieldCancel}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null
              }
            </div>
          </div>
        </div>
      </Template>
    )
  }
}


export default withStore(Profile)
