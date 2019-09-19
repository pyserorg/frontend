import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Style } from 'radium'

// Pages
import BlogDetail from 'pages/blog/detail'
import BlogList from 'pages/blog/list'
import CfP from 'pages/cfp'
import CfPDetail from 'pages/cfp/detail'
import CfPList from 'pages/cfp/list'
import CfS from 'pages/cfs'
import CfSDetail from 'pages/cfs/detail'
import CfSList from 'pages/cfs/list'
import CoC from 'pages/coc'
import Dashboard from 'pages/dashboard'
import EventList from 'pages/event/list'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Login from 'pages/login'
import MassEmail from 'pages/mass-email'
import NoPage from 'pages/nopage'
import Register from 'pages/register'
import Schedule from 'pages/talk/schedule'
import TalkDetail from 'pages/talk/detail'
import UserDetail from 'pages/user/detail'
import UserList from 'pages/user/list'
import VolunteerList from 'pages/volunteering/list'
import Volunteering from 'pages/volunteering'

import store from 'store'
import styles from 'styles'
import ResolutionContext from 'resolution'



class App extends React.Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
  }

  constructor(props) {
    super(props)
    store.event.fetchAll()
    window.onresize = () => {
      this.setState({ height: window.innerHeight })
      this.setState({ width: window.innerWidth })
    }
  }

  render() {
    const context = {
      height: this.state.height,
      width: this.state.width,
    }
    return (
      <ResolutionContext.Provider value={context}>
        <Style rules={styles} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/blog" component={BlogList} />
          <Route exact path="/blog/:year/:month/:day/:slug" component={BlogDetail} />
          <Route exact path="/cfp" component={CfP} />
          <Route exact path="/cfp/list" component={CfPList} />
          <Route exact path="/cfp/:id" component={CfPDetail} />
          <Route exact path="/cfs" component={CfS} />
          <Route exact path="/cfs/:id" component={CfSDetail} />
          <Route exact path="/:year/cfs" component={CfSList} />
          <Route exact path="/:year/cfs/:page" component={CfSList} />
          <Route exact path="/coc" component={CoC} />
          <Route exact path="/events" component={EventList} />
          <Route exact path="/:year/gallery" component={Gallery} />
          <Route exact path="/:year/schedule" component={Schedule} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mass-email" component={MassEmail} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/talk/:id" component={TalkDetail} />
          <Route exact path="/user/:id" component={UserDetail} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:page" component={UserList} />
          <Route exact path="/volunteering" component={Volunteering} />
          <Route exact path="/volunteers" component={VolunteerList} />
          <Route exact path="/volunteers/:page" component={VolunteerList} />
          <Route exact path="/:year" component={Landing} />
          <Route path="*" component={NoPage} />
        </Switch>
      </ResolutionContext.Provider>
    )
  }
}

export default App
