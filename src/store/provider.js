import React, { useState } from 'react'

// Pages
import {
  EmptyTemplate,
  Store,
  Resolution,
  Role,
  User,
} from 'freenit'
import Auth from 'pages/auth'
import CfP from 'pages/cfp'
import CfS from 'pages/cfs'
import Event from 'pages/event'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Profile from 'pages/profile'
import Talk from 'pages/talk'
import { withRouter } from 'react-router-dom'


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
    profile: new Profile.store(useState(Profile.initial.detail)),
    notification: new EmptyTemplate.store(
      useState(EmptyTemplate.initial.detail),
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
