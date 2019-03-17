import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Paper from '@material-ui/core/Paper'
import Talk from 'components/organisms/talk'

import Template from 'templates/default'
import store from 'store'
import styles from './styles'


@observer
class CfPList extends React.Component {
  componentWillMount() {
    store.title.title = 'Call for Papers'
    store.cfp.fetchAll()
  }

  render() {
    return (
      <Template style={{}} secure={this.props.secure}>
        <Paper style={styles.root}>
          {store.cfp.list.data.map(talk => <Talk key={talk.id} talk={talk} />)}
        </Paper>
      </Template>
    )
  }
}


CfPList.propTypes = {
  secure: PropTypes.bool,
}


CfPList.defaultProps = {
  secure: true,
}


export default CfPList
