import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import errorActions from 'templates/empty/actions'
import { blogProps } from 'pages/blog-detail'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  auth: state.auth.state,
  blogs: state.blogList.result,
  error: state.blogList.error,
  status: state.blogList.status,
  addResult: state.blogAdd.result,
  addError: state.blogAdd.error,
  addStatus: state.blogAdd.status,
})


class BlogList extends Component {
  state = {
    createOpen: false,
    blogs: {
      data: [],
    },
    title: '',
  }

  componentWillMount() {
    this.props.requestTitle('Blog')
    this.props.requestBlogList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 200) {
      this.setState({ blogs: nextProps.blogs })
      this.props.requestBlogListReset()
    } else if (nextProps.status >= 400) {
      this.props.requestError(nextProps.error)
      this.props.requestBlogListReset()
    } else if (nextProps.addStatus === 200) {
      const date = moment(nextProps.addResult.date)
      this.props.history.push(
        `/blog/${date.format('YYYY/MM/DD')}/${nextProps.addResult.slug}`,
      )
      this.props.requestBlogAddReset()
    } else if (nextProps.addStatus >= 400) {
      this.props.requestError(nextProps.addError)
      this.props.requestBlogAddReset()
    }
  }

  handleOpenCreate = () => {
    this.setState({ createOpen: true })
  }

  handleCloseCreate = () => {
    this.setState({ createOpen: false })
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  handleBlogCreate = () => {
    this.props.requestBlogAdd(this.state.title)
  }

  render() {
    const blogList = this.state.blogs.data.map(blog => {
      const date = moment(blog.date)
      return (
        <div key={blog.id} style={styles.blog}>
          <Link to={`/blog/${date.format('YYYY/MM/DD')}/${blog.slug}`}>
            <h1>{blog.title}</h1>
          </Link>
          <div style={styles.date}>
            {date.calendar()}
          </div>
          <ReactMarkdown>
            {blog.content.substring(0, 200)}
          </ReactMarkdown>
        </div>
      )
    })
    const addButton = this.props.auth
      ? (
        <Fab color="primary" onClick={this.handleOpenCreate}>
          <AddIcon />
        </Fab>
      )
      : ''
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          {addButton}
          {blogList}
        </Paper>
        <Dialog open={this.state.createOpen}>
          <DialogTitle>Set backup account</DialogTitle>
          <DialogContent>
            <TextField
              label="title"
              onChange={this.handleTitle}
              value={this.state.title}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreate} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleBlogCreate} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Template>
    )
  }
}


BlogList.propTypes = {
  addError: PropTypes.string,
  addResult: blogProps,
  addStatus: PropTypes.number,
  auth: PropTypes.bool,
  blogs: PropTypes.shape({
    data: PropTypes.arrayOf(blogProps),
  }),
  error: PropTypes.string,
  requestBlogAdd: PropTypes.func.isRequired,
  requestBlogAddReset: PropTypes.func.isRequired,
  requestBlogList: PropTypes.func.isRequired,
  requestBlogListReset: PropTypes.func.isRequired,
  requestError: PropTypes.func.isRequired,
  requestTitle: PropTypes.func.isRequired,
  status: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default connect(
  mapStateToProps,
  { ...errorActions, ...titleActions, ...actions },
)(withRouter(BlogList))
