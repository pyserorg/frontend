import React from 'react'
import PropTypes from 'prop-types'
import getStyles from './styles'


class TimeBox extends React.Component {
  render() {
    const styles = getStyles(this.props.time, this.props.end)
    const title = this.props.time.minute() % 15 === 0
      ? this.props.time.format('HH:mm')
      : ''
    return (
      <div style={styles.root}>
        {title}
      </div>
    )
  }
}


TimeBox.propTypes = {
  time: PropTypes.shape({
    format: PropTypes.func.isRequired,
    minute: PropTypes.func.isRequired,
  }).isRequired,
  end: PropTypes.bool,
}


export default TimeBox
