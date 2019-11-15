import React from 'react'
import { withStore } from 'store'
import Template from 'templates/default/detail'

// Components
import {
  Button,
  Paper,
} from '@material-ui/core'
import AdminDashboard from './admin'
import UserDashboard from './user'

import styles from './styles'


class Dashboard extends React.Component {
  state = {
    admin: false,
  }

  handleDashboard = (admin) => () => {
    this.setState({ admin })
  }

  render() {
    let AdminButton
    if (this.props.store.me.detail.admin) {
      AdminButton = this.state.admin
        ? (
          <Button
            variant="outlined"
            style={styles.button}
            onClick={this.handleDashboard(false)}
          >
            User Dashboard
          </Button>
        ) : (
          <Button
            variant="outlined"
            style={styles.button}
            onClick={this.handleDashboard(true)}
          >
            Admin Dashboard
          </Button>
        )
    }
    const ActiveDashboard = this.state.admin
      ? AdminDashboard
      : UserDashboard
    return (
      <Template secure style={{}}>
        <Paper style={styles.root}>
          <ActiveDashboard />
          {AdminButton}
        </Paper>
      </Template>
    )
  }
}


export default withStore(Dashboard)
