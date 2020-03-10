import React from 'react'
import PropTypes from 'prop-types'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  TextField,
} from '@material-ui/core'

// Icons
import AddIcon from '@material-ui/icons/Add'

import Template from 'templates/default/detail'
import styles from './styles'


class EventList extends React.Component {
  state = {
    createOpen: false,
    year: new Date().getFullYear(),
  }

  fetch = async () => {
    const { event, notification } = this.props.store
    const response = await event.fetchAll()
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  handleOpenCreate = () => {
    this.setState({ createOpen: true })
  }

  handleCloseCreate = () => {
    this.setState({ createOpen: false })
  }

  handleEventCreate = () => {
    this.props.store.event.create(this.state.year)
    this.handleCloseCreate()
  }

  handleYear = (event) => {
    this.setState({ year: event.target.value })
  }

  handleEvent = (year) => async () => {
    const { event, history, notification } = this.props.store
    const response = await event.fetch(year)
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    } else {
      history.push(`/${year}`)
    }
  }

  render() {
    const { data } = this.props.store.event.list
    const eventsView = data.map(event => (
        <h2 key={event.id}>
          <span
            style={styles.title}
            onClick={this.handleEvent(event.year)}
          >
            {event.year}
          </span>
        </h2>
    ))
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          {eventsView}
          <Fab color="primary" onClick={this.handleOpenCreate} data-id="add">
            <AddIcon />
          </Fab>
        </Paper>
        <Dialog open={this.state.createOpen}>
          <DialogTitle>Add new event</DialogTitle>
          <DialogContent>
            <TextField
              label="year"
              onChange={this.handleYear}
              value={this.state.year}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreate} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEventCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Template>
    )
  }
}


EventList.propTypes = {
  store: PropTypes.shape({
    event: PropTypes.shape({
      list: PropTypes.shape({
        data: PropTypes.array.isRequired,
        pages: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}


export default withStore(EventList)
