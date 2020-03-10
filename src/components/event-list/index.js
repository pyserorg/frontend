import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  errors,
  withStore,
} from 'freenit'

// Components
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core'

import styles from './styles'


class EventList extends Component {
  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { event, notification } = this.props.store
    const response = await event.fetchAll()
    if (!response.ok) {
      const error = errors(response)
      notification.show(error.message)
    }
  }

  render() {
    const { event } = this.props.store
    return (
      <Badge badgeContent={event.list.data.length} color="primary">
        <Card>
          <CardContent>
            <Typography variant="h5">
              Events
            </Typography>
            <Typography color="textSecondary">
              All events
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/events" style={styles.link}>
              <Button variant="outlined" size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      </Badge>
    )
  }
}


export default withStore(EventList)
