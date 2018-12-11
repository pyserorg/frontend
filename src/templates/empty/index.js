import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import ProtectedComponent from 'components/atoms/protected'
import actions from './actions'


const mapStateToProps = state => ({
  open: state.error.open,
  error: state.error.message,
})


class EmptyTemplate extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <ProtectedComponent redirect={this.props.secure} />
        {this.props.children}
        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.props.open}
          onClose={this.props.requestErrorReset}
          message={this.props.error}
          action={(
            <Button
              color="secondary"
              size="small"
              onClick={this.props.requestErrorReset}
            >
              CLOSE
            </Button>
          )}
        />
      </div>
    )
  }
}


EmptyTemplate.propTypes = {
  children: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  open: PropTypes.bool,
  requestErrorReset: PropTypes.func.isRequired,
  secure: PropTypes.bool,
  style: PropTypes.shape({}),
}


EmptyTemplate.defaultProps = {
  style: {
    padding: 20,
  },
}


export default connect(mapStateToProps, actions)(EmptyTemplate)
