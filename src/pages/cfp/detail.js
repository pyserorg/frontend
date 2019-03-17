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
class CfPDetail extends React.Component {
  componentWillMount() {
    store.title.title = 'Call for Papers'
    store.cfp.get(this.props.match.params.id)
  }

  render() {
    return (
      <Template style={{}} secure={this.props.secure}>
        <Paper style={styles.root}>
          <Talk talk={store.cfp.talk} />
        </Paper>
      </Template>
    )
  }
}


CfPDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  secure: PropTypes.bool,
}


CfPDetail.defaultProps = {
  secure: true,
}


export default CfPDetail
