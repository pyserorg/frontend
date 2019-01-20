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
import CloseIcon from '@material-ui/icons/Clear'
import CoCIcon from '@material-ui/icons/Accessibility'
import CfSIcon from '@material-ui/icons/MonetizationOn'
import GalleryIcon from '@material-ui/icons/Dashboard'
import ScheduleIcon from '@material-ui/icons/Schedule'
import MenuIcon from '@material-ui/icons/Menu'

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
    const menuButtons = this.props.resolution.width > 600
      ? (
        <div>
          <Link to="/schedule" style={styles.a.white}>
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
              Frontend Startkit - {title.title}
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
                <Link to="/schedule" style={styles.a}>
                  <MenuItem>
                    <ListItemIcon>
                      <ScheduleIcon />
                    </ListItemIcon>
                    Schedule
                  </MenuItem>
                </Link>
                <Link to="/gallery" style={styles.a}>
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
