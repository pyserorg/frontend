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
    edit: null,
    title: '',
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
      [field]: store.talk.detail[field],
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
    const user = talk.user
      ? (
        <div>
          <h3>
            {talk.user.firstName}
            &nbsp;
            {talk.user.lastName}
          </h3>
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
    const title = this.state.edit === 'title'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.title}
              label="Title"
              onChange={this.handleFieldChange('title')}
              autoFocus
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('title')}>
            OK
          </Button>
        </div>
      ) : (
        <Tooltip title="Click to edit" placement="right">
          <h1
            onClick={this.handleEdit('title')}
            role="presentation"
          >
            {talk.title}
          </h1>
        </Tooltip>
      )
    const description = this.state.edit === 'description'
      ? (
        <div>
          <div>
            <TextField
              value={this.state.description}
              label="description"
              onChange={this.handleFieldChange('description')}
              autoFocus
            />
          </div>
          <Button variant="outlined" onClick={this.handleEditCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit('description')}>
            OK
          </Button>
        </div>
      ) : (
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
