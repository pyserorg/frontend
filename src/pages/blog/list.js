import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Switch from '@material-ui/core/Switch'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class BlogList extends Component {
  state = {
    createOpen: false,
    title: '',
  }

  componentWillMount() {
    store.title.title = 'Blog'
    store.blog.fetchAll()
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

  handleBlogCreate = async () => {
    const { blog, error } = store
    const result = await blog.create(this.state.title)
    if (result.status === 200) {
      const date = moment(result.data.date)
      this.props.history.push(`/blog/${date.format('YYYY/MM/DD')}/${result.data.slug}`)
    } else {
      error.message = result.error
      error.open = true
    }
    this.handleCloseCreate()
  }

  handleChangePublished = (post) => () => {
    const data = { published: !post.published }
    store.blog.edit(post, data)
  }

  handleRemove = (post) => async () => {
    const result = await store.blog.remove(post)
    if (result.status >= 400) {
      store.error.message = result.error
      store.error.open = true
    }
  }

  blogControl = (post) => {
    const control = store.auth.auth
      ? (
        <div>
          <Switch
            checked={post.published}
            onChange={this.handleChangePublished(post)}
            color="primary"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleRemove(post)}
          >
            Delete
          </Button>
        </div>
      )
      : ''
    return control
  }

  render() {
    const blogList = store.blog.list.data.map(post => {
      const date = moment(post.date)
      return (
        <div key={post.id} style={styles.blog}>
          <div style={styles.blog.title}>
            <Link to={`/blog/${date.format('YYYY/MM/DD')}/${post.slug}`}>
              <h1>{post.title}</h1>
            </Link>
            {this.blogControl(post)}
          </div>
          <div style={styles.date}>
            {date.calendar()}
          </div>
          <ReactMarkdown>
            {post.content.substring(0, 200)}
          </ReactMarkdown>
        </div>
      )
    })
    const addButton = store.auth.auth
      ? (
        <Fab
          color="primary"
          onClick={this.handleOpenCreate}
          style={styles.add}
        >
          <AddIcon />
        </Fab>
      )
      : ''
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          {blogList}
          {addButton}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default withRouter(BlogList)
