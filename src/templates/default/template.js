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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// Icons
import BlogIcon from '@material-ui/icons/Description'
import CfSIcon from '@material-ui/icons/MonetizationOn'
import CloseIcon from '@material-ui/icons/Clear'
import CoCIcon from '@material-ui/icons/Accessibility'
import EventIcon from '@material-ui/icons/Event'
import GalleryIcon from '@material-ui/icons/Dashboard'
import MenuIcon from '@material-ui/icons/Menu'
import ScheduleIcon from '@material-ui/icons/Schedule'

import EmptyTemplate from 'templates/empty'
import store from 'store'
import styles from './styles'


@observer
class Template extends Component {
  state = {
    anchorEl: null,
    menu: [],
    showMenu: false,
  }

  handleLogout = async () => {
    await store.auth.logout()
    this.props.history.push('/landing')
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenuOpen = () => {
    this.setState({ showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false })
  }

  render() {
    const { title } = store
    const open = Boolean(this.state.anchorEl)
    const { year } = store.event.detail
    const menuButtons = this.props.resolution.width > 750
      ? (
        <div>
          <Link to={`/${year}/schedule`} style={styles.a.white}>
            <Button color="inherit">Schedule</Button>
          </Link>
          <Link to="/cfp" style={styles.a.white}>
            <Button color="inherit">CfP</Button>
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
          <Link to="/events" style={styles.a.white}>
            <Button color="inherit">Events</Button>
          </Link>
        </div>
      )
      : (
        <IconButton
          color="inherit"
          onClick={this.handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
      )
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.flex}>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              PySer - {title.title}
            </Typography>
            {menuButtons}
            <Menu
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              {this.state.menu}
            </Menu>
            <Drawer
              open={this.state.showMenu}
              onClose={this.handleMenuClose}
              anchor="right"
            >
              <AppBar position="static">
                <Toolbar>
                  <Typography
                    variant="title"
                    color="inherit"
                    style={styles.flex}
                  >
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
                <Link to={`/${year}/schedule`} style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <ScheduleIcon />
                    </ListItemIcon>
                    Schedule
                  </MenuItem>
                </Link>
                <Link to={`/${year}/gallery`} style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <GalleryIcon />
                    </ListItemIcon>
                    Gallery
                  </MenuItem>
                </Link>
                <Link to="/cfs" style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <CfSIcon />
                    </ListItemIcon>
                    CfS
                  </MenuItem>
                </Link>
                <Link to="/coc" style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <CoCIcon />
                    </ListItemIcon>
                    CoC
                  </MenuItem>
                </Link>
                <Link to="/blog" style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <BlogIcon />
                    </ListItemIcon>
                    Blog
                  </MenuItem>
                </Link>
                <Link to="/events" style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    Events
                  </MenuItem>
                </Link>
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
        <EmptyTemplate secure={this.props.secure} style={this.props.style}>
          {this.props.children}
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
  resolution: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
}


export default withRouter(Template)
