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

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value })
  }

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value })
  }

  submitName = () => {
    store.me.edit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    })
  }

  handleEditEmail = () => {
    this.setState({
      edit: 'email',
      email: store.me.detail.email,
    })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  submitEmail = () => {
    store.me.edit({ email: this.state.email })
  }

  render() {
    const name = this.state.edit === 'name'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.firstName}
              label="First Name"
              onChange={this.handleFirstNameChange}
            />
          </div>
          <div>
            <TextField
              value={this.state.lastName}
              label="Last Name"
              onChange={this.handleLastNameChange}
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
              onChange={this.handleEmailChange}
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.submitEmail}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <span
            onClick={this.handleEditEmail}
            role="presentation"
          >
            {store.me.detail.email}
          </span>
        </Tooltip>
      )
    return (
      <div style={styles.content}>
        <div style={styles.user}>
          {name}
          {email}
        </div>
        <div style={styles.talks}>
          {store.talk.list.data.map(talk => (
            <TalkBox key={talk.id} talk={talk} />
          ))}
        </div>
      </div>
    )
  }
}


UserDashboard.propTypes = {
}


export default UserDashboard
