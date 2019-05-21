import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

import Template from 'templates/default'
import store from 'store'
import getStyles from './styles'


@observer
class TalkDetail extends Component {
  state = {
    description: '',
    edit: null,
    title: '',
    video: '',
  }

  componentWillMount() {
    store.title.title = 'Talk Detail'
    store.talk.fetch(this.props.match.params.id)
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  handleEdit = (field) => () => {
    this.setState({
      edit: field,
      [field]: store.talk.detail[field] || '',
    })
  }

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleSubmit = (field) => () => {
    store.talk.edit({
      [field]: this.state[field],
    })
    this.setState({ edit: null })
  }

  render() {
    const styles = getStyles({ data: [] })
    const talk = store.talk.detail
    const enableEdit = talk.user.id === store.me.detail.id || store.me.detail.admin
    const user = talk.user
      ? (
        <div>
          <h3>
            {talk.user.firstName}
            &nbsp;
            {talk.user.lastName}
          </h3>
          {
            store.me.detail.admin
              ? <h4>{talk.user.email}</h4>
              : null
          }
          <div style={styles.bio}>
            {talk.user.bio}
          </div>
          <div>
            facebook:
            &nbsp;
            {talk.user.facebook}
          </div>
          <div>
            twitter:
            &nbsp;
            {talk.user.twitter}
          </div>
        </div>
      ) : null
    let title;
    if (enableEdit)
    {
      if (this.state.edit === 'title') {
        title = (
          <div>
            <div>
              <TextField
                value={this.state.title}
                label="Title"
                onChange={this.handleFieldChange('title')}
                autoFocus
                fullWidth
              />
            </div>
            <Button variant="outlined" onClick={this.handleEditCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit('title')}>
              OK
            </Button>
          </div>
        )
      } else {
        title = (
          <Tooltip title="Click to edit" placement="right">
            <h1
              onClick={this.handleEdit('title')}
              role="presentation"
            >
              {talk.title}
            </h1>
          </Tooltip>
        )
      }
    } else {
      title = (
        <h1
          onClick={this.handleEdit('title')}
          role="presentation"
        >
          {talk.title}
        </h1>
      )
    }
    let description;
    if (enableEdit) {
      if (this.state.edit === 'description') {
        description = (
          <div>
            <div>
              <TextField
                value={this.state.description}
                label="description"
                onChange={this.handleFieldChange('description')}
                autoFocus
                fullWidth
                multiline
              />
            </div>
            <Button variant="outlined" onClick={this.handleEditCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit('description')}>
              OK
            </Button>
          </div>
        )
      } else {
        description = (
          <Tooltip title="Click to edit" placement="right">
            <div
              style={styles.description}
              onClick={this.handleEdit('description')}
              role="presentation"
            >
              {talk.description}
            </div>
          </Tooltip>
        )
      }
    } else {
      description = (
        <div
          style={styles.description}
          onClick={this.handleEdit('description')}
          role="presentation"
        >
          {talk.description}
        </div>
      )
    }
    let video
    if (this.state.edit === 'video' && enableEdit) {
      video = (
        <div>
          <div>
            <TextField
              value={this.state.video}
              label="video"
              onChange={this.handleFieldChange('video')}
              autoFocus
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('video')}>
            OK
          </Button>
        </div>
      )
    } else if (talk.video) {
      const embed = (
        <iframe
          title="Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${talk.video}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
      video = store.me.detail.admin
        ? (
          <div>
            <div>
              {embed}
            </div>
            <Button variant="outlined" onClick={this.handleEdit('video')}>
              Edit
            </Button>
          </div>
        ) : (
          <div>
            {embed}
          </div>
        )
    } else if (store.me.detail.admin) {
      video = (
        <Button variant="outlined" onClick={this.handleEdit('video')}>
          Add Video
        </Button>
      )
    }
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          {title}
          {description}
          <div>
            Duration:
            &nbsp;
            {talk.duration}
            min
          </div>
          <div>
            Hall:
            &nbsp;
            {talk.hall}
          </div>
          {user}
          {video}
        </Paper>
      </Template>
    )
  }
}


TalkDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default TalkDetail
