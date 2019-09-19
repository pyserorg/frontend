import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { withTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

// Components
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TalkBox from 'components/organisms/talk-box'
import Template from 'templates/default'
import TextField from '@material-ui/core/TextField'
import TimeBox from 'components/organisms/time-box'
import Tooltip from '@material-ui/core/Tooltip'
import YearSwitch from 'components/organisms/year-switch'

import store from 'store'
import getStyles from './styles'


@observer
class Schedule extends React.Component {
  state = {
    hall: 'presentations',
  }

  componentWillMount() {
    store.title.title = 'Schedule'
    store.talk.fetchPublished(this.props.match.params.year)
  }

  generateTimes = (talks) => {
    let start = null
    let end = null
    const result = []
    talks.data.forEach(talk => {
      const talkStart = moment(talk.start)
      const talkEnd = moment(talk.end)
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
    store.talk.fetchPublished(store.event.detail.year)
    this.props.history.push(`/${store.event.detail.year}/schedule`)
  }

  handlePublished = () => {
    store.event.edit(
      this.props.match.params.year,
      { published: !store.event.detail.published },
    )
  }

  handleAnnouncement = () => {
    store.talk.announce(store.event.detail.year)
  }

  handleHallChange = (event) => {
    this.setState({ hall: event.target.value })
  }

  render() {
    const styles = getStyles(store.talk.list, this.props.theme)
    const publishSwitch = store.me.detail.admin
      ? (
        <Tooltip title="publish" placement="right">
          <Switch
            onChange={this.handlePublished}
            checked={store.event.detail.published}
          />
        </Tooltip>
      ) : null
    const announce = store.me.detail.admin
      ? (
        <Button onClick={this.handleAnnouncement} variant="outlined">
          Announce
        </Button>
      ) : null
    const talks = store.talk.list.data.filter(
      talk => talk.hall === this.state.hall,
    )
    const scheduleView = store.event.detail.published || store.me.detail.admin
      ? (
        <div style={styles.schedule}>
          <div style={styles.title}>time</div>
          <div style={styles.title}>
            <h3 style={styles.hall}>{this.state.hall}</h3>
          </div>
          <div style={styles.title}>time</div>
          {this.generateTimes(store.talk.list)}
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


export default withTheme(withRouter(Schedule))
