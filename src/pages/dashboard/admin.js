import React from 'react'

import EventList from 'components/organisms/event-list'
import RoleList from 'components/organisms/role-list'
import UserList from 'components/organisms/user-list'

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
