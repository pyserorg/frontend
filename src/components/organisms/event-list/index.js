import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import store from 'store'
import styles from './styles'


@observer
class EventList extends Component {
  componentWillMount() {
    store.event.fetchAll()
  }

  render() {
    return (
      <Badge badgeContent={store.event.list.data.length} color="primary">
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


EventList.propTypes = {
}


export default EventList
