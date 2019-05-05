import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import Template from 'templates/default'
import store from 'store'
import AdminDashboard from './admin'
import UserDashboard from './user'
import styles from './styles'


@observer
class Dashboard extends Component {
  state = {
    admin: false,
  }

  componentWillMount() {
    store.title.title = 'Dashboard'
    this.setState({ admin: store.me.detail.admin })
  }

  toggleAdmin = () => {
    this.setState(prevState => ({ admin: !prevState.admin }))
  }

  render() {
    const dashboard = this.state.admin
      ? <AdminDashboard />
      : <UserDashboard />
    const user = this.state.admin
      ? 'user'
      : 'admin'
    const viewButton = store.me.detail.admin
      ? (
        <Button onClick={this.toggleAdmin} variant="outlined">
          View as
          &nbsp;
          {user}
        </Button>
      ) : null
    return (
      <Template secure={this.props.secure} style={{}}>
        <Paper style={styles.root}>
          {dashboard}
          <div style={styles.center}>
            {viewButton}
          </div>
        </Paper>
      </Template>
    )
  }
}


Dashboard.propTypes = {
  secure: PropTypes.bool,
}


Dashboard.defaultProps = {
  secure: true,
}


export default Dashboard
