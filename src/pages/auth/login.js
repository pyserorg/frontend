import React from 'react'

// Components
import {
  Auth,
} from 'freenit'


export default class Login extends React.Component {
  render() {
    return (
      <Auth.login redirect="/profile" />
    )
  }
}
