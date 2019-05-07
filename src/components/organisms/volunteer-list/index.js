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
class VolunteerList extends Component {
  componentWillMount() {
    store.volunteering.fetchAll()
  }

  render() {
    return (
      <Badge badgeContent={store.volunteering.list.data.length} color="primary">
        <Card>
          <CardContent>
            <Typography variant="h5">
              Volunteers
            </Typography>
            <Typography color="textSecondary">
              All volunteers
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/volunteers" style={styles.link}>
              <Button variant="outlined" size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      </Badge>
    )
  }
}


export default VolunteerList
