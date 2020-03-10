import React from 'react'
import {
  RoleList,
  UserList,
} from 'freenit'

import {
  EventList,
} from 'components'

import styles from './styles'


class AdminDashboard extends React.Component {
  render() {
    return (
      <div style={styles.content}>
        <UserList />
        <RoleList />
        <EventList />
      </div>
    )
  }
}


export default AdminDashboard
