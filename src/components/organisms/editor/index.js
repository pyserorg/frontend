import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import BoldIcon from '@material-ui/icons/FormatBold'
import StrikeThroughIcon from '@material-ui/icons/StrikethroughS'
import ItalicIcon from '@material-ui/icons/FormatItalic'
import LinkIcon from '@material-ui/icons/Link'
import ImageIcon from '@material-ui/icons/Image'
import store from 'store'


@observer
class Editor extends Component {
  state = {
    start: 0,
    end: 0,
  }

  handleFormat = (formatString) => () => {
    const { start, end } = this.state
    const { detail } = store[this.props.item]
    if (end - start > 0) {
      const before = detail.content.slice(0, start)
      const selection = detail.content.slice(start, end)
      const after = detail.content.slice(end, detail.content.length)
      const content = `${before}${formatString}${selection}${formatString}${after}`
      detail.content = content
    }
  }

  handleSelect = (event) => {
    const { selectionStart, selectionEnd } = event.target
    this.setState({ start: selectionStart, end: selectionEnd })
  }

  handleEdit = (event) => {
    const { detail } = store.blog
    detail.content = event.target.value
  }

  handleLink = (prefix = '', suffix = '') => () => {
    const { start, end } = this.state
    const { detail } = store.blog
    let selection
    const before = detail.content.slice(0, start)
    const after = detail.content.slice(end, detail.content.length)
    if (end - start > 0) {
      const oldSelection = detail.content.slice(start, end)
      selection = `${prefix}[${oldSelection}](https://pyser.org/${suffix})`
    } else {
      selection = `${prefix}[link text](https://pyser.org/${suffix})`
    }
    const content = `${before}${selection}${after}`
    detail.content = content
  }

  render() {
    const { detail } = store.blog
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
          value={detail.content}
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
  item: PropTypes.string.isRequired,
}


export default Editor
