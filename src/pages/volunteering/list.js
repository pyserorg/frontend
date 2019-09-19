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
class VolunteerList extends React.Component {
  componentWillMount() {
    store.title.title = 'Volunteer List'
    const page = Number(this.props.match.params.page || '0')
    store.volunteering.fetchAll(page)
  }

  componentWillReceiveProps(nextProps) {
    const oldPage = Number(this.props.match.params.page || '0')
    const newPage = Number(nextProps.match.params.page || '0')
    if (oldPage !== newPage) {
      store.volunteering.fetchAll(newPage)
    }
  }

  handleVolunteerActive = (volunteer) => () => {
    store.volunteering.edit(volunteer.id, { active: !volunteer.active })
  }

  render() {
    const page = Number(this.props.match.params.page || '0')
    const previous = page !== 0
      ? (
        <Link
          to={page !== 1 ? `/volunteers/${page - 1}` : '/volunteers'}
          style={this.props.theme.overrides.noDecorationLink}
        >
          <Button variant="outlined">
            &lt;
          </Button>
        </Link>
      )
      : (
        <Button variant="outlined" disabled>
          &lt;
        </Button>
      )
    const next = page !== store.volunteering.list.pages - 1
      ? (
        <Link
          to={`/volunteers/${page + 1}`}
          style={this.props.theme.overrides.noDecorationLink}
        >
          <Button variant="outlined">
            &gt;
          </Button>
        </Link>
      )
      : (
        <Button variant="outlined" disabled>
          &gt;
        </Button>
      )
    const volunteerList = store.volunteering.list.data.map(volunteer => (
      <List style={styles.item} key={volunteer.id}>
        <ListItem dense button>
          <Avatar>{volunteer.id}</Avatar>
          <ListItemText primary={volunteer.email} />
          <ListItemSecondaryAction>
            <Switch
              onChange={this.handleVolunteerActive(volunteer)}
              checked={volunteer.active}
            />
            <Link
              to={`/user/${volunteer.id}`}
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
            {volunteerList}
            <div style={styles.center}>
              {previous}
              <Avatar style={styles.page}>{String(page)}</Avatar>
              {next}
            </div>
          </Paper>
        </Template>
      )
      : <NoPage />
  }
}


VolunteerList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape().isRequired,
}


export default withTheme(VolunteerList)
