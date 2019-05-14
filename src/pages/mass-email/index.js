import React from 'react'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import Template from 'templates/default'
import NoPage from 'pages/nopage'
import store from 'store'
import styles from './styles'


@observer
class MassEmail extends React.Component {
  componentWillMount() {
    store.title.title = 'Mass Email'
  }

  handleFrom = (event) => {
    store.email.detail.from = event.target.value
  }

  handleTo = (event) => {
    store.email.detail.to = event.target.value
  }

  handleSubject = (event) => {
    store.email.detail.subject = event.target.value
  }

  handleMessage = (event) => {
    store.email.detail.message = event.target.value
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const result = await store.email.send()
    if (result.status === 200) {
      store.error.message = 'Mail sent successfully'
    } else {
      store.error.message = result.error
    }
    store.error.open = true
  }

  render() {
    return store.me.detail.admin
      ? (
        <Template style={{}}>
          <Paper style={styles.root}>
            <form onSubmit={this.handleSubmit} style={styles.form}>
              <div style={styles.form.content}>
                <h1>Mass Email</h1>
                <TextField
                  label="From"
                  value={store.email.detail.from}
                  onChange={this.handleFrom}
                  margin="normal"
                  select
                  required
                  fullWidth
                >
                  <MenuItem value="office">
                    Office
                  </MenuItem>
                  <MenuItem value="me">
                    Me
                  </MenuItem>
                </TextField>
                <TextField
                  label="To"
                  value={store.email.detail.to}
                  onChange={this.handleTo}
                  margin="normal"
                  select
                  required
                  fullWidth
                >
                  <MenuItem value="all">
                    All
                  </MenuItem>
                  <MenuItem value="presenters">
                    Presenters
                  </MenuItem>
                  <MenuItem value="volunteers">
                    Volunteers
                  </MenuItem>
                  <MenuItem value="admins">
                    Admins
                  </MenuItem>
                </TextField>
                <TextField
                  onChange={this.handleSubject}
                  label="Subject"
                  value={store.email.detail.subject}
                  required
                  fullWidth
                  autoFocus
                />
                <TextField
                  onChange={this.handleMessage}
                  label="Message"
                  value={store.email.detail.message}
                  required
                  fullWidth
                  multiline
                />
                <Button variant="outlined" type="submit" style={styles.submit}>
                  Send
                </Button>
              </div>
            </form>
          </Paper>
        </Template>
      ) : <NoPage />
  }
}


export default MassEmail
