import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { withStore, EmptyTemplate } from 'freenit'

// Components
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core'

// Icons
import CFPIcon from '@material-ui/icons/Assessment'
import CFSIcon from '@material-ui/icons/AttachMoney'
import CloseIcon from '@material-ui/icons/Clear'
import CoCIcon from '@material-ui/icons/Assignment'
import DashboardIcon from '@material-ui/icons/Dashboard'
import EventIcon from '@material-ui/icons/EventNote'
import GalleryIcon from '@material-ui/icons/Apps'
import LoginIcon from '@material-ui/icons/Input'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import RoleIcon from '@material-ui/icons/People'
import ScheduleIcon from '@material-ui/icons/CalendarToday'
import UserIcon from '@material-ui/icons/PeopleOutline'
import VolunteeringIcon from '@material-ui/icons/AssignmentInd'

import styles from './styles'


class Template extends React.Component {
  state = {
    showMenu: false,
  }

  constructor(props) {
    super(props)
    this.fetch()
  }

  fetch = async () => {
    const { event, notification } = this.props.store
    const response = await event.fetchAll()
    if (!response.ok) {
      notification.show(response.message)
    }
  }

  handleLogout = async () => {
    const { auth  } = this.props.store
    const response = await auth.logout()
    if (response.ok === undefined) {
      this.props.history.push('/')
    }
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false })
  }

  render() {
    const { auth, event, profile, resolution } = this.props.store
    const AnonButton = (
      <Link to="/login" style={styles.login}>
        <IconButton color="inherit">
          <LoginIcon />
        </IconButton>
      </Link>
    )
    const LoggedinButton = (
      <IconButton color="inherit" onClick={this.handleLogout}>
        <LogoutIcon />
      </IconButton>
    )
    const AuthButton = auth.detail.ok ? LoggedinButton : AnonButton
    const AdminMenu = profile.detail.admin
      ? [
        (
          <Link to="/dashboard" key="dashboard">
            <MenuItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              Dashboard
            </MenuItem>
          </Link>
        ),
        (
          <Link to="/users" key="users">
            <MenuItem>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              Users
            </MenuItem>
          </Link>
        ),
        (
          <Link to="/roles" key="roles">
            <MenuItem>
              <ListItemIcon>
                <RoleIcon />
              </ListItemIcon>
              Roles
            </MenuItem>
          </Link>
        ),
      ] : []
    const LoggingMenu = auth.detail.ok
      ? (
        <MenuItem onClick={this.handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      ) : (
        <Link to="/login">
          <MenuItem>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            Login
          </MenuItem>
        </Link>
      )
    const AuthMenu = auth.detail.ok
      ? [
        (
          <Link to="/profile" key="profile">
            <MenuItem>
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
          </Link>
        ),
        ...AdminMenu,
      ]
      : null
    const schedule = event.list.total > 0
      ? (
        <Link to={`/${event.detail.year}/schedule`}>
          <Button color="inherit">Schedule</Button>
        </Link>
      ) : null
    const gallery = event.list.total > 0
      ? (
        <Link to={`/${event.detail.year}/gallery`}>
          <Button color="inherit">Gallery</Button>
        </Link>
      ) : null
    const BarLinks = resolution.detail.width > 410
      ? (
        <div>
          {schedule}
          {gallery}
          {AuthButton}
        </div>
      ) : null
    const PublicMenu = event.list.total > 0
      ? [
        (
          <Link to={`/${event.detail.year}/schedule`} key="schedule">
            <MenuItem>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              Schedule
            </MenuItem>
          </Link>
        ),
        (
          <Link to="/volunteering" style={styles.a} key="volunteering">
            <MenuItem>
              <ListItemIcon>
                <VolunteeringIcon />
              </ListItemIcon>
              Volunteering
            </MenuItem>
          </Link>
        ),
        (
          <Link to={`${event.detail.year}/gallery`} key="gallery">
            <MenuItem>
              <ListItemIcon>
                <GalleryIcon />
              </ListItemIcon>
              Gallery
            </MenuItem>
          </Link>
        ),
        (
          <Link to="/events" style={styles.a} key="events">
            <MenuItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              Events
            </MenuItem>
          </Link>
        ),
      ] : null
    const title = resolution.detail.width > 510
      ? 'Python Serbia'
      : 'PySer'
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" color="inherit" style={styles.flex}>
              <IconButton color="inherit" onClick={this.handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Link to="/" data-id="app">
                {title}
              </Link>
            </Typography>
            {BarLinks}
          </Toolbar>
        </AppBar>
        <EmptyTemplate.detail secure={this.props.secure} style={this.props.style}>
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
              {PublicMenu}
              <Link to="/coc" style={styles.a}>
                <MenuItem>
                  <ListItemIcon>
                    <CoCIcon />
                  </ListItemIcon>
                  CoC
                </MenuItem>
              </Link>
              <Link to="/cfp" style={styles.a}>
                <MenuItem>
                  <ListItemIcon>
                    <CFPIcon />
                  </ListItemIcon>
                  CFP
                </MenuItem>
              </Link>
              <Link to="/cfs" style={styles.a}>
                <MenuItem>
                  <ListItemIcon>
                    <CFSIcon />
                  </ListItemIcon>
                  CFS
                </MenuItem>
              </Link>
              {AuthMenu}
              {LoggingMenu}
            </div>
          </Drawer>
        </EmptyTemplate.detail>
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


export default withRouter(withStore(Template))
