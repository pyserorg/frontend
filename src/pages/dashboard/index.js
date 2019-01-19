import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class Dashboard extends Component {
  componentWillMount() {
    store.title.title = 'Dashboard'
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
}


Dashboard.defaultProps = {
  secure: true,
}


export default Dashboard
