import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers'

import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class CfPDetail extends React.Component {
  componentWillMount() {
    store.title.title = 'Call for Papers'
    store.cfp.get(this.props.match.params.id)
  }

  handlePublished = () => {
    store.cfp.publish(!store.cfp.talk.published)
  }

  handleDate = (date) => {
    const newDate = new Date(date)
    const oldDate = store.cfp.talk.start
    newDate.setHours(oldDate.getHours())
    newDate.setMinutes(oldDate.getMinutes())
    newDate.setSeconds(oldDate.getSeconds())
    store.cfp.talk.start = newDate
  }

  handleStartTime = (time) => {
    const newTime = new Date(time)
    const oldTime = store.cfp.talk.start
    newTime.setFullYear(oldTime.getFullYear())
    newTime.setMonth(oldTime.getMonth())
    newTime.setDate(oldTime.getDate())
    store.cfp.talk.start = newTime
  }

  render() {
    return (
      <Template style={{}} secure={this.props.secure}>
        <Paper style={styles.root}>
          <h1 style={styles.title}>{store.cfp.talk.title}</h1>
          <div>
            {store.cfp.talk.description}
          </div>
          <Tooltip title="Publish the talk">
            <Switch
              checked={store.cfp.talk.published}
              onChange={this.handlePublished}
            />
          </Tooltip>
          <div>
            start: &nbsp;
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Date picker"
                value={store.cfp.talk.start}
                onChange={this.handleDate}
              />
              <TimePicker
                margin="normal"
                label="Time picker"
                value={store.cfp.talk.start}
                onChange={this.handleStartTime}
              />
            </MuiPickersUtilsProvider>
          </div>
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
  secure: PropTypes.bool,
}


CfPDetail.defaultProps = {
  secure: true,
}


export default CfPDetail
