import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import styles from './styles'


const mapStateToProps = () => ({})


class Dashboard extends Component {
  componentWillMount() {
    this.props.requestTitle('Dashboard')
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
  requestTitle: PropTypes.func.isRequired,
}


Dashboard.defaultProps = {
  secure: true,
}


export default connect(mapStateToProps, titleActions)(Dashboard)
