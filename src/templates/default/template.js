import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

// Components
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Clear'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuIcon from '@material-ui/icons/Menu'

import EmptyTemplate from 'templates/empty'
import store from 'store'
import styles from './styles'


@observer
class Template extends Component {
  state = {
    showMenu: false,
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false })
  }

  handleLogout = () => {
    store.auth.logout()
    this.props.history.push('/')
  }

  render() {
    const AnonButton = (
      <Link to="/login" style={styles.login}>
        <Button color="inherit">Login</Button>
      </Link>
    )
    const LoggedinButton = (
      <Button color="inherit" onClick={this.handleLogout}>
        Logout
      </Button>
    )
    const AuthButton = store.auth.auth ? LoggedinButton : AnonButton
    const menuButtonAction = store.auth.auth ? this.handleMenuOpen : null
    const { year } = store.event.detail
    const menuButtons = (
      <div>
        <Link to={`/${year}/schedule`} style={styles.a.white}>
          <Button color="inherit">Schedule</Button>
        </Link>
        <Link to="/cfp" style={styles.a.white}>
          <Button color="inherit">CfP</Button>
        </Link>
        <Link to="/volunteering" style={styles.a.white}>
          <Button color="inherit">Volunteering</Button>
        </Link>
        <Link to="/cfs" style={styles.a.white}>
          <Button color="inherit">CfS</Button>
        </Link>
        <Link to="/coc" style={styles.a.white}>
          <Button color="inherit">CoC</Button>
        </Link>
        <Link to={`/${year}/gallery`} style={styles.a.white}>
          <Button color="inherit">Gallery</Button>
        </Link>
        <Link to="/blog" style={styles.a.white}>
          <Button color="inherit">Blog</Button>
        </Link>
      </div>
    )
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={menuButtonAction}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" style={styles.flex}>
              <Link to="/">
                {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
                PySer - {store.title.title}
              </Link>
            </Typography>
            {menuButtons}
          </Toolbar>
        </AppBar>
        <EmptyTemplate secure={this.props.secure} style={this.props.style}>
          {this.props.children}
          <Drawer open={this.state.showMenu} onClose={this.handleMenuClose}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h5" color="inherit" style={styles.flex}>
                  &nbsp;
                </Typography>
                <IconButton color="inherit" onClick={this.handleMenuClose}>
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div
              role="button"
              onClick={this.handleMenuClose}
              style={styles.menu}
              tabIndex={0}
              onKeyDown={this.handleMenuClose}
            >
              <Link to="/" style={styles.a}>
                <MenuItem>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
              </Link>
            </div>
          </Drawer>
        </EmptyTemplate>
      </div>
    )
  }
}


Template.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  secure: PropTypes.bool,
  style: PropTypes.shape({}),
  title: PropTypes.string,
}


export default withRouter(Template)
