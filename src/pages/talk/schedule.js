import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { withTheme } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

// Components
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import TalkBox from 'components/organisms/talk-box'
import Template from 'templates/default'
import TimeBox from 'components/organisms/time-box'
import Tooltip from '@material-ui/core/Tooltip'
import YearSwitch from 'components/organisms/year-switch'

import store from 'store'
import getStyles from './styles'


@observer
class Schedule extends React.Component {
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
    console.log(store.event.detail.published)
    store.event.edit(
      this.props.match.params.year,
      { published: !store.event.detail.published },
    )
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
    const scheduleView = store.event.detail.published || store.me.detail.admin
      ? (
        <div style={styles.schedule}>
          <div style={styles.title}>time</div>
          <div style={styles.title}>
            <h3>Presentations</h3>
          </div>
          <div style={styles.title}>
            <h3>Workshops</h3>
          </div>
          <div style={styles.title}>
            <h3>Business</h3>
          </div>
          <div style={styles.title}>time</div>
          {this.generateTimes(store.talk.list)}
          {
            store.talk.list.data.map(
              talk => <TalkBox key={talk.id} talk={talk} />,
            )
          }
        </div>
      ) : ''
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>Schedule</h1>
          <div style={styles.switch}>
            <YearSwitch onChange={this.handleYearChange} />
            {publishSwitch}
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


export default withTheme()(withRouter(Schedule))
