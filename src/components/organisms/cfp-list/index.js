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
class CfPList extends Component {
  componentWillMount() {
    store.cfp.fetchAll()
  }

  render() {
    return (
      <Badge badgeContent={store.cfp.list.data.length} color="primary">
        <Card>
          <CardContent>
            <Typography variant="h5">
              CfP
            </Typography>
            <Typography color="textSecondary">
              Call for papers
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/cfp/list" style={styles.link}>
              <Button variant="outlined" size="small">Explore</Button>
            </Link>
          </CardActions>
        </Card>
      </Badge>
    )
  }
}


CfPList.propTypes = {
}


export default CfPList
