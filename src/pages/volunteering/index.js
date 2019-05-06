import React from 'react'
import { observer } from 'mobx-react'

// Compontents
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import Template from 'templates/default'
import store from 'store'
import styles from './styles'

@observer
class Volunteering extends React.Component {
  componentWillMount() {
    store.title.title = 'Volunteering'
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const result = await store.volunteering.send()
    if (result.status >= 400) {
      store.error.message = result.error
      store.error.open = true
    }
  }

  handleEmail = (event) => {
    store.volunteering.detail.email = event.target.value
  }

  handleFirstName = (event) => {
    store.volunteering.detail.firstName = event.target.value
  }

  handleLastName = (event) => {
    store.volunteering.detail.lastName = event.target.value
  }

  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.h1}>Volunteering</h1>
          Conference is nothing without volunteers.
          Help us make the conference great!
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <div style={styles.form.content}>
              <TextField
                onChange={this.handleEmail}
                label="EMail"
                value={store.volunteering.detail.email}
                type="email"
                required
                fullWidth
                autoFocus
              />
              <TextField
                onChange={this.handleFirstName}
                label="First Name"
                value={store.volunteering.detail.firstName}
                required
                fullWidth
              />
              <TextField
                onChange={this.handleLastName}
                label="Last Name"
                value={store.volunteering.detail.lastName}
                required
                fullWidth
              />
              <Button
                type="submit"
                style={styles.button}
                variant="outlined"
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Template>
    )
  }
}


export default Volunteering
