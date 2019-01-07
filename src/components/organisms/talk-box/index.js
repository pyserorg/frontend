import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import getStyles from './styles'


class TalkBox extends React.Component {
  render() {
    const styles = getStyles(this.props.talk)
    return (
      <Paper style={styles.root}>
        <Link to={`/talk/${this.props.talk.id}`} style={styles.link}>
          <div>
            {this.props.talk.title}
          </div>
          <div>
            {this.props.talk.description}
          </div>
          <div>
            {this.props.talk.user.email}
          </div>
        </Link>
      </Paper>
    )
  }
}


TalkBox.propTypes = {
  talk: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default TalkBox
