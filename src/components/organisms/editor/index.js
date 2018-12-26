import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import BoldIcon from '@material-ui/icons/FormatBold'
import StrikeThroughIcon from '@material-ui/icons/StrikethroughS'
import ItalicIcon from '@material-ui/icons/FormatItalic'
import LinkIcon from '@material-ui/icons/Link'
import ImageIcon from '@material-ui/icons/Image'
import errorActions from 'templates/empty/actions'


const mapStateToProps = () => ({})


class Editor extends Component {
  handleFormat = (formatString) => () => {
    const { selectionStart, selectionEnd } = this.props.component.state
    if (selectionEnd - selectionStart > 0) {
      const before = this.props.component.state.content.slice(0, selectionStart)
      const selection = this.props.component.state.content.slice(
        selectionStart,
        selectionEnd,
      )
      const after = this.props.component.state.content.slice(
        selectionEnd,
        this.props.component.state.content.length,
      )
      const content = `${before}${formatString}${selection}${formatString}${after}`
      this.props.component.setState({ content })
    }
  }

  handleSelect = (event) => {
    const { selectionStart, selectionEnd } = event.target
    this.props.component.setState({ selectionStart, selectionEnd })
  }

  handleEdit = (event) => {
    this.props.component.setState({ content: event.target.value })
  }

  handleLink = (prefix = '', suffix = '') => () => {
    const { selectionStart, selectionEnd } = this.props.component.state
    let selection
    const before = this.props.component.state.content.slice(0, selectionStart)
    const after = this.props.component.state.content.slice(
      selectionEnd,
      this.props.component.state.content.length,
    )
    if (selectionEnd - selectionStart > 0) {
      const oldSelection = this.props.component.state.content.slice(
        selectionStart,
        selectionEnd,
      )
      selection = `${prefix}[${oldSelection}](https://pyser.org/${suffix})`
    } else {
      selection = `${prefix}[link text](https://pyser.org/${suffix})`
    }
    const content = `${before}${selection}${after}`
    this.props.component.setState({ content })
  }

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleFormat('**')}>
          <BoldIcon />
        </Button>
        <Button variant="outlined" onClick={this.handleFormat('*')}>
          <ItalicIcon />
        </Button>
        <Button variant="outlined" onClick={this.handleFormat('~~')}>
          <StrikeThroughIcon />
        </Button>
        <Button variant="outlined" onClick={this.handleLink()}>
          <LinkIcon />
        </Button>
        <Button
          variant="outlined"
          onClick={
            this.handleLink(
              '!',
              'static/media/pyser-logo.6b36a54e.svg',
            )
          }
        >
          <ImageIcon />
        </Button>
        <TextField
          value={this.props.value}
          onChange={this.handleEdit}
          onSelect={this.handleSelect}
          multiline
          fullWidth
        />
      </div>
    )
  }
}


Editor.propTypes = {
  component: PropTypes.shape({
    setState: PropTypes.func.isRequired,
    state: PropTypes.shape({
      content: PropTypes.string.isRequired,
      selectionStart: PropTypes.number.isRequired,
      selectionEnd: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  value: PropTypes.string.isRequired,
}


export default connect(mapStateToProps, errorActions)(Editor)
