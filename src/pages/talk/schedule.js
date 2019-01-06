import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import store from 'store'
import getStyles from './styles'


@observer
class Schedule extends React.Component {
  componentWillMount() {
    store.title.title = 'Schedule'
    store.talk.fetchAll(this.props.match.params.year)
  }

  render() {
    const styles = getStyles(store.talk.list)
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <div style={styles.schedule}>
            Schedule
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
}


export default Schedule
