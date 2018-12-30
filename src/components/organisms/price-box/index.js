import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import getStyles from './styles'
import actions from './actions'


const mapStateToProps = (state) => ({
  focused: state.cfsFocus.name,
})


class PriceBox extends React.Component {
  handleClick = () => {
    const focused = this.props.name === this.props.focused
      ? ''
      : this.props.name
    this.props.requestCfSFocus(focused)
  }

  render() {
    const styles = getStyles(this.props.backgroundColor)
    const rootStyle = this.props.name === this.props.focused
      ? styles.price.focused
      : styles.price
    return (
      <Paper style={rootStyle}>
        <Toolbar onClick={this.handleClick} style={styles.toolbar}>
          <div style={styles.title}>
            {this.props.price}
          </div>
          <div>
            {this.props.name}
          </div>
        </Toolbar>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </Paper>
    )
  }
}


PriceBox.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  focused: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  requestCfSFocus: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, actions)(PriceBox)
