import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { withStore } from 'freenit'
import moment from 'moment'
import { errors } from 'utils'

// Components
import {
  Button,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core'

import {
  TalkBox,
  TimeBox,
  YearSwitch,
} from 'components'

import Template from 'templates/default/detail'

import getStyles from './styles'


class Schedule extends React.Component {
  state = {
    hall: 'presentations',
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { notification, talk } = this.props.store
    const { year } = this.props.match.params
    const response = await talk.fetchPublished(year)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  generateTimes = (talks) => {
    let start = null
    let end = null
    const result = []
    talks.data.forEach(talk => {
      const talkStart = moment(talk.start)
      const talkEnd = moment(talk.start).add(talk.duration, 'minutes')
      if (start === null || talkStart.isBefore(start)) {
        start = talkStart
      }
      if (end === null || talkEnd.isAfter(end)) {
        end = talkEnd
      }
    })
    if (start && end) {
      for (let time = start; time <= end; time = moment(time).add(5, 'minutes')) {
        result.push(<TimeBox key={`start-${time.format('HH-mm')}`} time={time} />)
        result.push(<TimeBox key={`end-${time.format('HH-mm')}`} time={time} end />)
      }
    }
    return result
  }

  handleYearChange = () => {
    const { store } = this.props
    store.talk.fetchPublished(store.event.detail.year)
    this.props.history.push(`/${store.event.detail.year}/schedule`)
  }

  handlePublished = () => {
    const { store } = this.props
    store.event.edit(
      this.props.match.params.year,
      { published: !store.event.detail.published },
    )
  }

  handleAnnouncement = () => {
    const { store } = this.props
    store.talk.announce(store.event.detail.year)
  }

  handleHallChange = (event) => {
    this.setState({ hall: event.target.value })
  }

  render() {
    const { talk, me, event } = this.props.store
    const styles = getStyles(talk.list, this.props.theme)
    const publishSwitch = me.detail.admin
      ? (
        <Tooltip title="publish" placement="right">
          <Switch
            onChange={this.handlePublished}
            checked={event.detail.published}
          />
        </Tooltip>
      ) : null
    const announce = me.detail.admin
      ? (
        <Button onClick={this.handleAnnouncement} variant="outlined">
          Announce
        </Button>
      ) : null
    const talks = talk.list.data.filter(
      talk => talk.hall === this.state.hall,
    )
    const times = this.generateTimes(talk.list)
    const scheduleView = event.detail.published || me.detail.admin
      ? (
        <div style={styles.schedule}>
          <div style={styles.title}>time</div>
          <div style={styles.title}>
            <h3 style={styles.hall}>{this.state.hall}</h3>
          </div>
          <div style={styles.title}>time</div>
          {times}
          {
            talks.map(
              talk => <TalkBox key={talk.id} talk={talk} />,
            )
          }
        </div>
      ) : null
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>Schedule</h1>
          <div style={styles.switch}>
            <YearSwitch onChange={this.handleYearChange} />
            <TextField
              label="Hall"
              value={this.state.hall}
              onChange={this.handleHallChange}
              margin="normal"
              select
            >
              <MenuItem value="presentations">
                Presentations
              </MenuItem>
              <MenuItem value="workshops">
                Workshops
              </MenuItem>
              <MenuItem value="business">
                Business
              </MenuItem>
            </TextField>
            {publishSwitch}
            {announce}
          </div>
          {scheduleView}
        </Paper>
      </Template>
    )
  }
}


Schedule.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme(withRouter(withStore(Schedule)))
