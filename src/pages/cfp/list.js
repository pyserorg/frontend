import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStore } from 'freenit'
import { errors } from 'utils'

// Components
import {
  Paper,
} from '@material-ui/core'

import {
  Talk,
} from 'components'

import Template from 'templates/default/detail'
import styles from './styles'


class CfPList extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { cfp, me, notification } = this.props.store
    if (me.detail.admin === false) {
      this.props.history.push('/landing')
    }
    const response = await cfp.fetchAll()
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  componentDidUpdate = async () => {
    if (this.props.store.me.detail.admin === false) {
      this.props.history.push('/landing')
    }
  }

  render() {
    const { data } = this.props.store.cfp.list
    return (
      <Template style={{}} secure>
        <Paper style={styles.root}>
          {data.map(talk => <Talk key={talk.id} talk={talk} />)}
        </Paper>
      </Template>
    )
  }
}


CfPList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default withRouter(withStore(CfPList))
