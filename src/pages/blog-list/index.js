import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
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
import detailActions from 'pages/blog-detail/actions'
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
  deleteError: state.blogDelete.error,
  deleteStatus: state.blogDelete.status,
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
    } else if (nextProps.deleteStatus >= 400) {
      this.props.requestError(nextProps.deleteError)
      this.props.requestBlogDeleteReset()
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

  handleChangePublished = (id) => () => {
    this.setState((prevState) => {
      const blogs = {
        data: [],
        pages: prevState.pages,
        total: prevState.total,
      }
      for (let i = 0; i < prevState.blogs.data.length; ++i) {
        const blog = prevState.blogs.data[i]
        if (blog.id === id) {
          const blogDate = moment(blog.date)
          const year = blogDate.year()
          const month = blogDate.month() + 1
          const day = blogDate.date()
          blog.published = !blog.published
          this.props.requestBlogDetailEdit(
            year,
            month,
            day,
            blog.slug,
            { published: blog.published },
          )
        }
        blogs.data.push(blog)
      }
      return blogs
    })
  }

  handleDelete = (id) => () => {
    this.setState((prevState) => {
      const blogs = {
        data: [],
        pages: prevState.pages,
        total: prevState.total,
      }
      for (let i = 0; i < prevState.blogs.data.length; ++i) {
        const blog = prevState.blogs.data[i]
        if (blog.id === id) {
          const blogDate = moment(blog.date)
          const year = blogDate.year()
          const month = blogDate.month() + 1
          const day = blogDate.date()
          this.props.requestBlogDelete(
            year,
            month,
            day,
            blog.slug,
            { published: blog.published },
          )
        } else {
          blogs.data.push(blog)
        }
      }
      return { blogs }
    })
  }

  blogControl = (blog) => {
    const control = this.props.auth
      ? (
        <div>
          <Switch
            checked={blog.published}
            onChange={this.handleChangePublished(blog.id)}
            color="primary"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleDelete(blog.id)}
          >
            Delete
          </Button>
        </div>
      )
      : ''
    return control
  }

  render() {
    const blogList = this.state.blogs.data.map(blog => {
      const date = moment(blog.date)
      return (
        <div key={blog.id} style={styles.blog}>
          <div style={styles.blog.title}>
            <Link to={`/blog/${date.format('YYYY/MM/DD')}/${blog.slug}`}>
              <h1>{blog.title}</h1>
            </Link>
            {this.blogControl(blog)}
          </div>
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
  deleteError: PropTypes.string,
  deleteStatus: PropTypes.number,
  error: PropTypes.string,
  requestBlogAdd: PropTypes.func.isRequired,
  requestBlogAddReset: PropTypes.func.isRequired,
  requestBlogDelete: PropTypes.func.isRequired,
  requestBlogDeleteReset: PropTypes.func.isRequired,
  requestBlogDetailEdit: PropTypes.func.isRequired,
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
  {
    ...errorActions,
    ...titleActions,
    ...detailActions,
    ...actions,
  },
)(withRouter(BlogList))
