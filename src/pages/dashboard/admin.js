import React from 'react'
import { observer } from 'mobx-react'
import CfPList from 'components/organisms/cfp-list'
import EventList from 'components/organisms/event-list'
import styles from './styles'


@observer
class AdminDashboard extends React.Component {
  render() {
    return (
      <div style={styles.content}>
        <CfPList />
        <EventList />
      </div>
    )
  }
}


AdminDashboard.propTypes = {
}


export default AdminDashboard
