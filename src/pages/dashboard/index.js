import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'


class Dashboard extends Component {
  componentWillMount() {
    this.props.store.title.title = 'Dashboard'
  }

  render() {
    return (
      <Template secure={this.props.secure}>
        <div style={styles.root}>
          Dashboard
        </div>
      </Template>
    )
  }
}


Dashboard.propTypes = {
  secure: PropTypes.bool,
  store: PropTypes.shape({
    title: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


Dashboard.defaultProps = {
  secure: true,
}


export default observer((props) => <Dashboard {...props} store={store} />)
