import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { withTheme } from '@material-ui/core/styles'
import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import TalkBox from 'components/organisms/talk-box'
import TimeBox from 'components/organisms/time-box'
import store from 'store'
import getStyles from './styles'


@observer
class Schedule extends React.Component {
  componentWillMount() {
    store.title.title = 'Schedule'
    store.talk.fetchAll(this.props.match.params.year)
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
      if (end === null || talkEnd.isBefore(end)) {
        end = talkEnd
      }
    })
    if (start && end) {
      let time
      for (time = start; time <= end; time = moment(time).add(5, 'minutes')) {
        result.push(<TimeBox key={`start-${time.format('HH-mm')}`} time={time} />)
        result.push(<TimeBox key={`end-${time.format('HH-mm')}`} time={time} end />)
      }
    }
    return result
  }

  render() {
    const styles = getStyles(store.talk.list, this.props.theme)
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>Schedule</h1>
          <div style={styles.schedule}>
            <div style={styles.title}>time</div>
            <div style={styles.title}>
              <h3>Saloon</h3>
            </div>
            <div style={styles.title}>
              <h3>202</h3>
            </div>
            <div style={styles.title}>
              <h3>212</h3>
            </div>
            <div style={styles.title}>time</div>
            {this.generateTimes(store.talk.list)}
            {
              store.talk.list.data.map(
                talk => <TalkBox key={talk.id} talk={talk} />,
              )
            }
          </div>
        </Paper>
      </Template>
    )
  }
}


Schedule.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape({}).isRequired,
}


export default withTheme()(Schedule)
