import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Paper,
} from '@material-ui/core'

import {
  Talk,
} from 'components'

import Template from 'templates/default/detail'
import styles from './styles'


class CfPDetail extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { cfp, notification } = this.props.store
    const response = await cfp.fetch(this.props.match.params.id)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  render() {
    const { cfp } = this.props.store
    return (
      <Template style={{}} secure>
        <Paper style={styles.root}>
          <Talk talk={cfp.detail} />
        </Paper>
      </Template>
    )
  }
}


CfPDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default withStore(CfPDetail)
