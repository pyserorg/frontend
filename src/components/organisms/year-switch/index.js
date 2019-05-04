import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import store from 'store'


@observer
class YearSwitch extends React.Component {
  handleYearChange = (event) => {
    store.event.detail.year = event.target.value
    store.event.fetch(event.target.value)
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  render() {
    const currentYear = new Date().getFullYear()
    return (
      <TextField
        label="Year"
        select
        required
        value={store.event.detail.year || currentYear}
        onChange={this.handleYearChange}
        margin="normal"
      >
        {store.event.list.data.map((event) => (
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


export default YearSwitch
