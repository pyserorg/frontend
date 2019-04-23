import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

// Components
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'

import NoPage from 'pages/nopage'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'

@observer
class UserList extends React.Component {
  componentWillMount() {
    store.title.title = 'Sponsor List'
    store.user.fetchAll()
  }

  handleUserActive = (user) => () => {
    store.user.edit(user.id, { active: !user.active })
  }

  render() {
    const userList = store.user.list.data.map(user => (
      <List style={styles.item} key={user.id}>
        <ListItem dense button>
          <Avatar>{user.id}</Avatar>
          <ListItemText primary={user.email} />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleUserActive(user)}
              checked={user.active}
            />
            <Link
              to={`/user/${user.id}`}
              style={this.props.theme.overrides.noDecorationLink}
            >
              <Button style={styles.details} variant="outlined" color="primary">
                Details
              </Button>
            </Link>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    ))
    return store.me.detail.admin
      ? (
        <Template style={{}}>
          <Paper style={styles.root}>
            {userList}
          </Paper>
        </Template>
      )
      : <NoPage />
  }
}


UserList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape().isRequired,
}


export default withTheme()(UserList)
