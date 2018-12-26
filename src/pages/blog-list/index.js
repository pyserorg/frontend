import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'
import errorActions from 'templates/empty/actions'
import { blogProps } from 'pages/blog-detail'
import actions from './actions'
import styles from './styles'


const mapStateToProps = (state) => ({
  blogs: state.blogList.result,
  error: state.blogList.error,
  status: state.blogList.status,
})


class BlogList extends Component {
  state = {
    blogs: {
      data: [],
    },
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
    }
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
    return (
      <Template>
        {blogList}
      </Template>
    )
  }
}


BlogList.propTypes = {
  blogs: PropTypes.shape({
    data: PropTypes.arrayOf(blogProps),
  }),
  error: PropTypes.string,
  requestBlogList: PropTypes.func.isRequired,
  requestBlogListReset: PropTypes.func.isRequired,
  requestError: PropTypes.func.isRequired,
  requestTitle: PropTypes.func.isRequired,
  status: PropTypes.number,
}


export default connect(mapStateToProps, { ...errorActions, ...titleActions, ...actions })(
  BlogList,
)
