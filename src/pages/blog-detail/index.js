import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import ReactMarkdown from 'react-markdown'
import Template from 'templates/default'
import Editor from 'components/organisms/editor'
import titleActions from 'templates/default/actions'
import errorActions from 'templates/empty/actions'
import {
  handleEdit,
  handleOver,
  handleValue,
  linkTarget,
} from 'utils'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  auth: state.auth.state,
  blog: state.blogDetail.result,
  blogEdit: state.blogDetailEdit.result,
  error: state.blogDetail.error,
  errorEdit: state.blogDetailEdit.error,
  status: state.blogDetail.status,
  statusEdit: state.blogDetailEdit.status,
})


class BlogDetail extends Component {
  state = {
    editContent: false,
    // eslint-disable-next-line react/no-unused-state
    selectionEnd: 0,
    // eslint-disable-next-line react/no-unused-state
    selectionStart: 0,
  }

  componentWillMount() {
    const {
      year,
      month,
      day,
      slug,
    } = this.props.match.params
    this.props.requestBlogDetail(year, month, day, slug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 200) {
      this.setState({
        content: nextProps.blog.content,
        title: nextProps.blog.title,
      })
      this.props.requestTitle(nextProps.blog.title)
      this.props.requestBlogDetailReset()
    } else if (nextProps.status >= 400) {
      this.props.requestError(nextProps.error)
      this.props.requestBlogDetailReset()
    } else if (nextProps.statusEdit === 200) {
      this.setState({
        content: nextProps.blogEdit.content,
        title: nextProps.blogEdit.title,
      })
      this.props.requestTitle(nextProps.blogEdit.title)
      this.props.requestBlogDetailEditReset()
    } else if (nextProps.statusEdit >= 400) {
      this.props.requestError(nextProps.errorEdit)
      this.props.requestBlogDetailEditReset()
    }
  }

  handleEdit = () => {
    this.setState(prevState => ({
      editContent: true,
      oldContent: prevState.content,
    }))
  }

  handleSave = () => {
    const {
      year,
      month,
      day,
      slug,
    } = this.props.match.params
    this.props.requestBlogDetailEdit(
      year,
      month,
      day,
      slug,
      { content: this.state.content },
    )
    this.setState({
      editContent: false,
      oldContent: null,
    })
  }

  handleCancel = () => {
    this.setState(prevState => ({
      editContent: false,
      content: prevState.oldContent,
      oldContent: null,
    }))
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
      this.props.requestBlogDetailEdit(
        year,
        month,
        day,
        slug,
        { title: this.state.title },
      )
    }
    handleEdit(item, false, this)()
  }

  render() {
    const editor = this.state.editContent
      ? <Editor component={this} value={this.state.content} />
      : ''
    const date = moment(this.props.blog.date).calendar()
    let button
    if (this.props.auth) {
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
      if (this.props.auth) {
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
            {this.state.title}
          </h1>
          {editIcon}
        </div>
      )
    }
    return (
      <Template>
        <div style={styles.root}>
          {title}
          <span style={styles.date}>
            {date}
            &nbsp;
            {this.props.blog.author.email}
          </span>
        </div>
        {editor}
        <img
          src="https://tilda.center/static/images/logo.png"
          alt="logo"
          style={styles.image}
        />
        <ReactMarkdown
          source={this.state.content}
          linkTarget={linkTarget}
        />
        <div style={styles.button}>
          {button}
        </div>
      </Template>
    )
  }
}


export const blogProps = PropTypes.shape({
  author: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
})


BlogDetail.propTypes = {
  auth: PropTypes.bool,
  blog: blogProps,
  blogEdit: blogProps,
  error: PropTypes.string,
  errorEdit: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
      month: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  requestBlogDetail: PropTypes.func.isRequired,
  requestBlogDetailEdit: PropTypes.func.isRequired,
  requestBlogDetailEditReset: PropTypes.func.isRequired,
  requestBlogDetailReset: PropTypes.func.isRequired,
  requestError: PropTypes.func.isRequired,
  requestTitle: PropTypes.func.isRequired,
  status: PropTypes.number,
  statusEdit: PropTypes.number,
}


BlogDetail.defaultProps = {
  blog: {
    author: {
      email: '',
    },
    id: 0,
    content: '',
    date: '2018-11-22T09:01:38',
    title: '',
  },
}


export default connect(mapStateToProps, { ...errorActions, ...titleActions, ...actions })(
  BlogDetail,
)
