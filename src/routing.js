import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Pages
import Auth from 'pages/auth'
import CfP from 'pages/cfp'
import CfS from 'pages/cfs'
import CoC from 'pages/coc'
import Dashboard from 'pages/dashboard'
import Event from 'pages/event'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Me from 'pages/me'
import NoPage from 'pages/nopage'
import Role from 'pages/role'
import Talk from 'pages/talk'
import User from 'pages/user'
import Volunteering from 'pages/volunteering'


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing.detail} />
      <Route exact path="/cfp" component={CfP.form} />
      <Route exact path="/cfp/:id" component={CfP.detail} />
      <Route exact path="/cfp/list" component={CfP.list} />
      <Route exact path="/cfs" component={CfS.detail} />
      <Route exact path="/coc" component={CoC.detail} />
      <Route exact path="/dashboard" component={Dashboard.detail} />
      <Route exact path="/event/:year" component={Event.detail} />
      <Route exact path="/events" component={Event.list} />
      <Route exact path="/login" component={Auth.login} />
      <Route exact path="/me" component={Me.detail} />
      <Route exact path="/register" component={Auth.register} />
      <Route exact path="/role/:id" component={Role.detail} />
      <Route exact path="/roles" component={Role.list} />
      <Route exact path="/roles/:page" component={Role.list} />
      <Route exact path="/talk/:id" component={Talk.detail} />
      <Route exact path="/user/:id" component={User.detail} />
      <Route exact path="/users" component={User.list} />
      <Route exact path="/users/:page" component={User.list} />
      <Route exact path="/volunteering" component={Volunteering.detail} />
      <Route exact path="/:year/gallery" component={Gallery.detail} />
      <Route exact path="/:year/schedule" component={Talk.schedule} />
      <Route exact path="/:year" component={Landing.detail} />
      <Route path="*" component={NoPage} />
    </Switch>
  )
}


export default Routing
