import React, { Component } from 'react'
import { observer } from 'mobx-react'
import store from 'store'
import TalkBox from 'components/organisms/talk-box'
import styles from './styles'


@observer
class UserDashboard extends Component {
  componentWillMount() {
    store.talk.fetchAllUser()
  }

  render() {
    return (
      <div style={styles.content}>
        <h1>
          {store.me.detail.firstName}
          &nbsp;
          {store.me.detail.lastName}
        </h1>
        {store.me.detail.email}
        <div style={styles.talks}>
          {store.talk.list.data.map(talk => <TalkBox talk={talk} />)}
        </div>
      </div>
    )
  }
}


UserDashboard.propTypes = {
}


export default UserDashboard
