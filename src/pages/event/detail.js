import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Paper,
  Switch,
} from '@material-ui/core'

import Template from 'templates/default/detail'
import styles from './styles'


class EventDetail extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { event, notification } = this.props.store
    const response = await event.fetch(this.props.match.params.year)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  handlePublish = async (e, published) => {
    const { event, notification } = this.props.store
    const response = await event.edit(event.detail.year, { published })
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  render() {
    const { event } = this.props.store
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.h1.small}>
            {event.detail.year}
          </h1>
          <Switch
            onChange={this.handlePublish}
            checked={event.detail.published}
          />
        </Paper>
      </Template>
    )
  }
}


EventDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default withStore(EventDetail)
