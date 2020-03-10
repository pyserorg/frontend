import React from 'react'
import Template from 'templates/default/detail'

// Components
import {
  Paper,
} from '@material-ui/core'
import AdminDashboard from './admin'

import styles from './styles'


export default class Dashboard extends React.Component {
  render() {
    return (
      <Template secure style={{}}>
        <Paper style={styles.root}>
          <AdminDashboard />
        </Paper>
      </Template>
    )
  }
}
