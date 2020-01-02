import React from 'react'
import PropTypes from 'prop-types'
import { errors } from 'utils'

// Components
import {
  Button,
  Paper,
  TextField,
  Tooltip,
} from '@material-ui/core'

import Template from 'templates/default/detail'
import { withStore } from 'freenit'
import getStyles from './styles'


class TalkDetail extends React.Component {
  state = {
    description: '',
    edit: null,
    title: '',
    video: '',
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { notification, talk } = this.props.store
    const response = await talk.fetch(this.props.match.params.id)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  handleFieldChange = (field) => (event) => {
    this.setState({ [field]: event.target.value })
  }

  handleEdit = (field) => () => {
    this.setState({
      edit: field,
      [field]: this.props.store.talk.detail[field] || '',
    })
  }

  handleEditCancel = () => {
    this.setState({ edit: null })
  }

  handleSubmit = (field) => () => {
    this.props.store.talk.edit(
      this.props.match.params.id,
      { [field]: this.state[field] },
    )
    this.setState({ edit: null })
  }

  render() {
    const { me, talk } = this.props.store
    const styles = getStyles({ data: [] })
    const enableEdit = talk.detail.user.id === me.detail.id || me.detail.admin
    const user = talk.detail.user.id
      ? (
        <div>
          <h3>
            {talk.detail.user.firstName}
            &nbsp;
            {talk.detail.user.lastName}
          </h3>
          {
            me.detail.admin
              ? <h4>{talk.detail.user.email}</h4>
              : null
          }
          <div style={styles.bio}>
            {talk.detail.user.bio}
          </div>
          <div>
            facebook:
            &nbsp;
            {talk.detail.user.facebook}
          </div>
          <div>
            twitter:
            &nbsp;
            {talk.detail.user.twitter}
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
              {talk.detail.title}
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
          {talk.detail.title}
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
              {talk.detail.description}
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
          {talk.detail.description}
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
    } else if (talk.detail.video) {
      const embed = (
        <iframe
          title="Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${talk.detail.video}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
      video = me.detail.admin
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
    } else if (me.detail.admin) {
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
            {talk.detail.duration}
            min
          </div>
          <div>
            Hall:
            &nbsp;
            {talk.detail.hall}
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


export default withStore(TalkDetail)
