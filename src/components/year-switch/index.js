import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import styles from './styles'


class YearSwitch extends React.Component {
  handleYearChange = async (event) => {
    const response = await this.props.store.event.fetch(event.target.value)
    if (!response.ok) {
      const error = errors(response)
      this.props.store.notification.show(error.message)
    }
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    return (
      <TextField
        label="Year"
        value={this.props.store.event.detail.year}
        onChange={this.handleYearChange}
        margin="normal"
        style={styles.year}
        select
      >
        {this.props.store.event.list.data.map((event) => (
          <MenuItem key={event.year} value={event.year}>
            {event.year}
          </MenuItem>
        ))}
      </TextField>
    )
  }
}


YearSwitch.propTypes = {
  onChange: PropTypes.func,
}


export default withStore(YearSwitch)
