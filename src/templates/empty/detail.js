import React from 'react'
import PropTypes from 'prop-types'
import { errors } from 'utils'

// Components
import {
  Button,
  Snackbar,
} from '@material-ui/core'

import ProtectedComponent from 'components/atoms/protected'
import { withStore } from 'store'


class EmptyTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { notification, event } = this.props.store
    if (event.list.initial) {
      const response = await event.fetchAll()
      if (!response.ok) {
        const error = errors(response)
        notification.show(error.message)
      }
    }
  }

  render() {
    const { notification } = this.props.store
    return (
      <div style={this.props.style}>
        <ProtectedComponent secure={this.props.secure} />
        {this.props.children}
        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={notification.detail.show}
          onClose={notification.close}
          message={notification.detail.message}
          action={(
            <Button
              color="secondary"
              size="small"
              onClick={notification.close}
            >
              CLOSE
            </Button>
          )}
        />
      </div>
    )
  }
}


EmptyTemplate.propTypes = {
  children: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  secure: PropTypes.bool,
  store: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
}


EmptyTemplate.defaultProps = {
  style: {
    padding: 20,
  },
}


export default withStore(EmptyTemplate)
