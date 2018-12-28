import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Style } from 'radium'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'

// Pages
import BlogDetail from 'pages/blog-detail'
import BlogList from 'pages/blog-list'
import CfS from 'pages/cfs'
import Dashboard from 'pages/dashboard'
import Gallery from 'pages/gallery'
import Landing from 'pages/landing'
import Login from 'pages/login'
import NoPage from 'pages/nopage'

import store from 'store'
import theme from 'theme'
import reset from 'reset'


export default class App extends Component {
  render() {
    return (
      <div>
        <Style rules={reset} />
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/blog" component={BlogList} />
                <Route exact path="/blog/:year/:month/:day/:slug" component={BlogDetail} />
                <Route exact path="/cfs" component={CfS} />
                <Route exact path="/:year/gallery" component={Gallery} />
                <Route exact path="/landing" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route path="*" component={NoPage} />
              </Switch>
            </BrowserRouter>
          </MuiThemeProvider>
        </Provider>
      </div>
    )
  }
}
