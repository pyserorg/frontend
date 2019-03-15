import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

import store from 'store'
import styles from './styles'


@observer
class Talk extends React.Component {
  handlePublished = () => {
    store.cfp.edit(
      this.props.talk.id,
      { published: !this.props.talk.published },
    )
  }

  handleStartTime = (time) => {
    const newTime = new Date(time)
    let oldTime
    if (store.cfp.talk.start) {
      oldTime = new Date(store.cfp.talk.start)
    } else {
      oldTime = new Date()
    }
    newTime.setFullYear(oldTime.getFullYear())
    newTime.setMonth(oldTime.getMonth())
    newTime.setDate(oldTime.getDate())
    const year = newTime.getFullYear()
    const month = newTime.getMonth()
    const day = newTime.getDay()
    const hour = newTime.getHours()
    const minute = newTime.getMinutes()
    const second = newTime.getSeconds()
    const timeString = `${year}-${month}-${day}T${hour}:${minute}:${second}`
    store.cfp.edit(
      this.props.talk.id,
      { start: timeString },
    )
  }

  handleDate = (date) => {
    const newDate = new Date(date)
    const oldDate = store.cfp.talk.start
    newDate.setHours(oldDate.getHours())
    newDate.setMinutes(oldDate.getMinutes())
    newDate.setSeconds(oldDate.getSeconds())
    store.cfp.talk.start = newDate
  }

  render() {
    return (
      <Paper style={styles.content}>
        Presentation Title:
        <h1 style={styles.title}>{this.props.talk.title}</h1>
        Presentation Description:
        <div style={styles.description}>
          {this.props.talk.description}
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="normal"
              label="Date picker"
              value={this.props.talk.start}
              onChange={this.handleDate}
            />
            <TimePicker
              margin="normal"
              label="Time picker"
              value={this.props.talk.start}
              onChange={this.handleStartTime}
            />
          </MuiPickersUtilsProvider>
        </div>
        Publish the talk
        <Switch
          checked={this.props.talk.published}
          onChange={this.handlePublished}
        />
      </Paper>
    )
  }
}


Talk.propTypes = {
  talk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    published: PropTypes.bool.isRequired,
    start: PropTypes.shape({}),
    title: PropTypes.string.isRequired,
  }).isRequired,
}


export default Talk
