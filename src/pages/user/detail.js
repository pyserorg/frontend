import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'

import NoPage from 'pages/nopage'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class UserDetail extends React.Component {
  componentWillMount() {
    store.title.title = 'User Detail'
    store.user.fetch(this.props.match.params.id)
  }

  handleActive = () => {
    store.user.edit(
      this.props.match.params.id,
      { active: !store.user.detail.active },
    )
  }

  handleAdmin = () => {
    store.user.edit(
      this.props.match.params.id,
      { admin: !store.user.detail.admin },
    )
  }

  render() {
    return store.me.detail.admin
      ? (
        <Template style={{}}>
          <Paper style={styles.root}>
            <h1 style={styles.h1.small}>
              {store.user.detail.firstName}
              &nbsp;
              {store.user.detail.lastName}
            </h1>
            <div style={styles.email}>
              {store.user.detail.email}
            </div>
            <div>
              Active:
              <Switch
                onChange={this.handleActive}
                checked={store.user.detail.active}
              />
            </div>
            <div>
              Admin:
              <Switch
                onChange={this.handleAdmin}
                checked={store.user.detail.admin}
              />
            </div>
          </Paper>
        </Template>
      )
      : <NoPage />
  }
}


UserDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default UserDetail
