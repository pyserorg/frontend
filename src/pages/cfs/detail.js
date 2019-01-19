import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import NoPage from 'pages/nopage'
import Template from 'templates/default'
import store from 'store'
import styles from './styles'

@observer
class CfSDetail extends React.Component {
  componentWillMount() {
    store.title.title = 'Call for Sponsors'
    store.cfs.fetch(this.props.match.params.id)
  }

  render() {
    return store.me.detail.admin
      ? (
        <Template style={{}}>
          <Paper style={styles.root}>
            <h1 style={styles.h1.small}>{store.cfs.detail.organization}</h1>
            <div style={styles.email}>
              {store.cfs.detail.email}
            </div>
            <div>
              {store.cfs.detail.message}
            </div>
          </Paper>
        </Template>
      )
      : <NoPage />
  }
}


CfSDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default CfSDetail
