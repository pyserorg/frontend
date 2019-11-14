import React from 'react'
import { withStore } from 'store'
import Template from 'templates/default/detail'

// Components
import {
  Paper,
} from '@material-ui/core'
import AdminDashboard from './admin'
import UserDashboard from './user'

import styles from './styles'


class Dashboard extends React.Component {
  render() {
    const ActiveDashboard = !this.props.store.me.detail.admin
      ? UserDashboard
      : AdminDashboard
    return (
      <Template secure style={{}}>
        <Paper style={styles.content}>
          <ActiveDashboard />
        </Paper>
      </Template>
    )
  }
}


export default withStore(Dashboard)
