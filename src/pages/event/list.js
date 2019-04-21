import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

// Components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

// Icons
import AddIcon from '@material-ui/icons/Add'

import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class EventList extends Component {
  state = {
    createOpen: false,
    year: new Date().getFullYear(),
  }

  componentWillMount() {
    store.title.title = 'Event List'
  }

  handleOpenCreate = () => {
    this.setState({ createOpen: true })
  }

  handleCloseCreate = () => {
    this.setState({ createOpen: false })
  }

  handleEventCreate = () => {
    store.event.create(this.state.year)
    this.handleCloseCreate()
  }

  handleYear = (event) => {
    this.setState({ year: event.target.value })
  }

  render() {
    const add = store.me.detail.admin
      ? (
        <Fab
          color="primary"
          onClick={this.handleOpenCreate}
          style={styles.add}
        >
          <AddIcon />
        </Fab>
      ) : null
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          {add}
          {store.event.list.data.map(event => (
            <Link key={event.year} to={`/${event.year}`} style={styles.link}>
              <h2>{event.year}</h2>
            </Link>
          ))}
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
            <Button onClick={this.handleEventCreate} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Template>
    )
  }
}


export default EventList
