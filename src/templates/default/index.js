import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

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
import actions from 'components/atoms/protected/actions'
import errorActions from 'templates/empty/actions'
import styles from './styles'


const mapStateToProps = state => ({
  authState: state.auth.state,
  logoutError: state.logout.error,
  logoutStatus: state.logout.status,
  open: state.error.open,
  title: state.title.title,
})


class Template extends Component {
  state = {
    showMenu: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutStatus === 200) {
      this.props.auth(false)
      this.props.history.push('/landing')
      this.props.requestLogoutReset()
    } else if (nextProps.logoutStatus >= 400) {
      this.props.requestError(nextProps.logoutError)
      this.props.requestLogoutReset()
    }
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false })
  }

  handleLogout = () => {
    this.props.requestLogout()
  }

  render() {
    const LoginButton = (
      <Link to="/login" style={styles.login}>
        <Button color="inherit">Login</Button>
      </Link>
    )
    const LogoutButton = (
      <Button color="inherit" onClick={this.handleLogout}>
        Logout
      </Button>
    )
    const AuthButton = this.props.authState ? LogoutButton : LoginButton
    const anonMenu = (
      <Link to="/blog" style={styles.a}>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          Blog
        </MenuItem>
      </Link>
    )
    const loggedInMenu = (
      <Link to="/" style={styles.a}>
        <MenuItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          Dashboard
        </MenuItem>
      </Link>
    )
    const menu = this.props.authState
      ? (
        <div
          role="button"
          onClick={this.handleMenuClose}
          style={styles.menu}
          tabIndex={0}
          onKeyDown={this.handleMenuClose}
        >
          {anonMenu}
          {loggedInMenu}
        </div>
      )
      : (
        <div
          role="button"
          onClick={this.handleMenuClose}
          style={styles.menu}
          tabIndex={0}
          onKeyDown={this.handleMenuClose}
        >
          {anonMenu}
        </div>
      )
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" style={styles.flex}>
              Tilda Center -
              &nbsp;
              {this.props.title}
            </Typography>
            {AuthButton}
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
            {menu}
          </Drawer>
        </EmptyTemplate>
      </div>
    )
  }
}


Template.propTypes = {
  auth: PropTypes.func.isRequired,
  authState: PropTypes.bool,
  children: PropTypes.node,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  logoutError: PropTypes.string,
  logoutStatus: PropTypes.number,
  requestError: PropTypes.func.isRequired,
  requestLogout: PropTypes.func.isRequired,
  requestLogoutReset: PropTypes.func.isRequired,
  secure: PropTypes.bool,
  style: PropTypes.shape({}),
  title: PropTypes.string,
}


export default connect(
  mapStateToProps,
  { ...errorActions, ...actions },
)(withRouter(Template))
