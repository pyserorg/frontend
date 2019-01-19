import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import NoPage from 'pages/nopage'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'

@observer
class CfSList extends React.Component {
  componentWillMount() {
    store.title.title = 'Sponsor List'
    store.cfs.fetchAll(this.props.match.params.year)
  }

  render() {
    const cfsList = store.cfs.list.data.map(cfs => (
      <List style={styles.item} key={cfs.id}>
        <ListItem dense button>
          <Avatar>{cfs.id}</Avatar>
          <ListItemText primary={cfs.organization} />
          <ListItemSecondaryAction>
            <Link
              to={`/cfs/${cfs.id}`}
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
            {cfsList}
          </Paper>
        </Template>
      )
      : <NoPage />
  }
}


CfSList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string.isRequired,
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  theme: PropTypes.shape().isRequired,
}


export default withTheme()(CfSList)
