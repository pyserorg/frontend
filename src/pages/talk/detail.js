import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import ReactMarkdown from 'react-markdown'
import Template from 'templates/default'
import Editor from 'components/organisms/editor'
import {
  handleEdit,
  handleOver,
  handleValue,
  linkTarget,
} from 'utils'
import store from 'store'
import styles from './styles'


@observer
class BlogDetail extends Component {
  state = {
    editContent: false,
  }

  componentWillMount() {
    const {
      year,
      month,
      day,
      slug,
    } = this.props.match.params
    store.blog.fetch(year, month, day, slug)
  }

  handleEdit = () => {
    this.setState({ editContent: true })
  }

  handleSave = () => {
    const {
      year,
      month,
      day,
      slug,
    } = this.props.match.params
    store.blog.edit(
      {
        year,
        month,
        day,
        slug,
      },
      { content: this.state.content },
    )
    this.setState({ editContent: false })
  }

  handleCancel = () => {
    this.setState({ editContent: false })
  }

  handleSubmit = (item) => (event) => {
    const {
      year,
      month,
      day,
      slug,
    } = this.props.match.params
    event.preventDefault()
    if (item === 'title') {
      store.blog.edit(
        {
          year,
          month,
          day,
          slug,
        },
        { title: this.state.title },
      )
    }
    handleEdit(item, false, this)()
  }

  render() {
    const editor = this.state.editContent
      ? <Editor item="blog" />
      : ''
    const date = moment(store.blog.detail.date).calendar()
    let button
    if (store.auth.auth) {
      button = this.state.editContent
        ? (
          <div>
            <Button
              onClick={this.handleCancel}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSave}
              variant="outlined"
            >
              Save
            </Button>
          </div>
        )
        : (
          <Button
            onClick={this.handleEdit}
            variant="outlined"
          >
            Edit
          </Button>
        )
    }
    let title
    if (this.state.edit === 'title') {
      title = (
        <form style={styles.title} onSubmit={this.handleSubmit('title')}>
          <TextField
            value={this.state.title}
            onChange={handleValue('title', this)}
            label="title"
            required
            autoFocus
          />
          <Button type="submit">
            Save
          </Button>
          <Button onClick={handleValue('title', this, true)}>
            Cancel
          </Button>
        </form>
      )
    } else {
      let editIcon = ''
      if (store.auth.auth) {
        editIcon = this.state.over === 'title'
          ? <EditIcon />
          : ''
      }
      title = (
        <div
          onClick={handleEdit('title', true, this)}
          onKeyDown={handleEdit('title', true, this)}
          tabIndex={0}
          role="button"
        >
          <h1
            style={styles.title}
            onMouseOver={handleOver('title', true, this)}
            onFocus={handleOver('title', true, this)}
            onMouseOut={handleOver('title', false, this)}
            onBlur={handleOver('title', false, this)}
          >
            {store.blog.detail.title}
          </h1>
          {editIcon}
        </div>
      )
    }
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <div style={styles.header}>
            {title}
            <span style={styles.date}>
              {date}
              &nbsp;
              {store.blog.detail.author.email}
            </span>
          </div>
          {editor}
          <img
            src="https://tilda.center/static/images/logo.png"
            alt="logo"
            style={styles.image}
          />
          <ReactMarkdown
            source={store.blog.detail.content}
            linkTarget={linkTarget}
          />
          <div style={styles.button}>
            {button}
          </div>
        </Paper>
      </Template>
    )
  }
}


BlogDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default BlogDetail
