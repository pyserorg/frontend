import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import getStyles from './styles'


class TalkBox extends React.Component {
  render() {
    const styles = getStyles(this.props.talk)
    const user = this.props.nouser
      ? ''
      : (
        <div>
          {this.props.talk.user.firstName}
          &nbsp;
          {this.props.talk.user.lastName}
        </div>
      )
    return (
      <Paper style={styles.root}>
        <Link to={`/talk/${this.props.talk.id}`} style={styles.link}>
          <div>
            {this.props.talk.title}
          </div>
          {user}
        </Link>
      </Paper>
    )
  }
}


TalkBox.propTypes = {
  nouser: PropTypes.bool,
  talk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start: PropTypes.string,
    end: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default TalkBox
