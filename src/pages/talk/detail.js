import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import Template from 'templates/default'
import store from 'store'
import getStyles from './styles'


@observer
class TalkDetail extends Component {
  componentWillMount() {
    store.title.title = 'Talk Detail'
    store.talk.fetch(this.props.match.params.id)
  }

  render() {
    const styles = getStyles({ data: [] })
    const talk = store.talk.detail
    const user = talk.user
      ? (
        <div>
          <h3>
            {talk.user.firstName}
            &nbsp;
            {talk.user.lastName}
          </h3>
          <div style={styles.bio}>
            {talk.user.bio}
          </div>
          <div>
            facebook:
            &nbsp;
            {talk.user.facebook}
          </div>
          <div>
            twitter:
            &nbsp;
            {talk.user.twitter}
          </div>
        </div>
      ) : null
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>{talk.title}</h1>
          <div style={styles.description}>{talk.description}</div>
          <div>
            Duration:
            &nbsp;
            {talk.duration}
            min
          </div>
          <div>
            Hall:
            &nbsp;
            {talk.hall}
          </div>
          {user}
        </Paper>
      </Template>
    )
  }
}


TalkDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default TalkDetail
