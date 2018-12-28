import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import getStyles from './styles'


class PriceBox extends React.Component {
  handleClick = () => {
    this.props.changeFocus(this.props.price)
  }

  render() {
    const styles = getStyles(this.context.muiTheme, this.props.color)
    const rootStyle = this.props.price === this.context.focused
      ? styles.price.focused
      : styles.price
    return (
      <Paper style={rootStyle}>
        <Toolbar onClick={this.handleClick} style={styles.toolbar}>
          {this.props.name} {this.props.price}
        </Toolbar>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </Paper>
    )
  }
}


PriceBox.contextTypes = {
  focused: PropTypes.string,
  muiTheme: PropTypes.object.isRequired,
}


PriceBox.propTypes = {
  changeFocus: PropTypes.func.isRequired,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string,
}


export default PriceBox
