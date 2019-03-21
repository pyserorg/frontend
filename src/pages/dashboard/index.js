import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import store from 'store'
import AdminDashboard from './admin'
import UserDashboard from './user'
import styles from './styles'


@observer
class Dashboard extends Component {
  componentWillMount() {
    store.title.title = 'Dashboard'
  }

  render() {
    let dashboard
    if (store.me.detail.admin !== undefined) {
      dashboard = store.me.detail.admin ? <AdminDashboard /> : <UserDashboard />
    }
    return (
      <Template secure={this.props.secure} style={{}}>
        <Paper style={styles.root}>
          {dashboard}
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
