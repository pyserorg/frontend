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
class UserList extends Component {
  componentWillMount() {
    store.user.fetchAll()
  }

  render() {
    return (
      <Badge badgeContent={store.user.list.data.length} color="primary">
        <Card>
          <CardContent>
            <Typography variant="h5">
              Users
            </Typography>
            <Typography color="textSecondary">
              All users
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/users" style={styles.link}>
              <Button variant="outlined" size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      </Badge>
    )
  }
}


export default UserList
