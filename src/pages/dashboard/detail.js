import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import Template from 'templates/default/detail'

// Components
import {
  Paper,
} from '@material-ui/core'
import EventList from 'components/organisms/event-list'
import RoleList from 'components/organisms/role-list'
import UserList from 'components/organisms/user-list'

import styles from './styles'


class Dashboard extends React.Component {
  render() {
    return (
      <Template secure style={{}}>
        <Paper style={styles.content}>
          <div style={styles.root}>
            <UserList />
            <RoleList />
            <EventList />
          </div>
        </Paper>
      </Template>
    )
  }
}


Dashboard.propTypes = {
  secure: PropTypes.bool,
}


export default withTheme(Dashboard)
