import React from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import store from 'store'
import { refreshExecute, timeoutClear } from 'utils'
import styles from './styles'


@observer
class ProtectedComponent extends React.Component {
  logged = false

  constructor(props) {
    super(props)
    this.refresh()
  }

  refresh = async () => {
    await refreshExecute()
    if (store.auth.status >= 400 && this.props.secure) {
      this.props.history.push('/')
    }
  }

  componentWillUnmount() {
    this.logged = false
    timeoutClear()
  }

  componentWillUpdate() {
    const { auth, error } = store
    if (auth.status === 200) {
      if (!this.logged) {
        this.logged = true
      }
    } else if (auth.status >= 400) {
      timeoutClear()
      if (this.logged) {
        this.logged = false
        error.message = 'Error refreshing login token! Please login!'
        error.open = true
        this.props.history.push('/login')
      }
    }
  }

  render() {
    return (
      <div style={styles.root}>
        {store.auth.auth}
        {store.auth.status}
      </div>
    )
  }
}


ProtectedComponent.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  secure: PropTypes.bool,
}


export default withRouter(ProtectedComponent)
