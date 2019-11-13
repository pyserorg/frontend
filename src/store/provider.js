import React, { useState } from 'react'
import Store from './index'

// Pages
import Auth from 'pages/auth'
import CfP from 'pages/cfp'
import CfS from 'pages/cfs'
import Event from 'pages/event'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Me from 'pages/me'
import Resolution from 'pages/resolution'
import Role from 'pages/role'
import Talk from 'pages/talk'
import User from 'pages/user'
import { withRouter } from 'react-router-dom'

// Templates
import Notification from 'templates/empty'


export const data = {}


const StoreProvider = (props) => {
  const store = {
    auth: new Auth.store(useState(Auth.initial.detail)),
    cfp: new CfP.store(
      useState(CfP.initial.detail),
      useState(CfP.initial.list),
    ),
    cfs: new CfS.store(useState(CfS.initial.detail)),
    event: new Event.store(
      useState(Event.initial.detail),
      useState(Event.initial.list),
    ),
    gallery: new Gallery.store(
      useState(Gallery.initial.detail),
      useState(Gallery.initial.list),
    ),
    history: props.history,
    landing: new Landing.store(useState(Landing.initial.detail)),
    me: new Me.store(
      useState(Me.initial.detail),
    ),
    notification: new Notification.store(
      useState(Notification.initial.detail),
    ),
    resolution: new Resolution.store(useState(Resolution.initial.detail)),
    role: new Role.store(
      useState(Role.initial.detail),
      useState(Role.initial.list),
    ),
    talk: new Talk.store(
      useState(Talk.initial.detail),
      useState(Talk.initial.list),
    ),
    user: new User.store(
      useState(User.initial.detail),
      useState(User.initial.list),
    ),
  }
  data.store = store
  return (
    <Store.Provider value={store}>
      {props.children}
    </Store.Provider>
  )
}


export default withRouter(StoreProvider)
