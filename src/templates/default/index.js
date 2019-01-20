import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'

// Components
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import EmptyTemplate from 'templates/empty'
import store from 'store'
import styles from './styles'


@observer
class Template extends Component {
  state = {
    anchorEl: null,
    menu: [],
  }

  handleLogout = async () => {
    await store.auth.logout()
    this.props.history.push('/landing')
  }

  handleMenu = (menu) => (event) => {
    const target = event.currentTarget
    let menuItems = []
    if (menu === 'talks') {
      menuItems = [
        <MenuItem onClick={this.handleClose}>
          <Link to="/2019/schedule" style={styles.a.black}>
            Schedule
          </Link>
        </MenuItem>,
      ]
    } else if (menu === 'cfs') {
      menuItems = []
    }
    this.setState({
      anchorEl: target,
      menu: menuItems,
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { title } = store
    const open = Boolean(this.state.anchorEl)
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.flex}>
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              Frontend Startkit - {title.title}
            </Typography>
            <Button
              onClick={this.handleMenu('talks')}
              color="inherit"
            >
              Talks
            </Button>
            <Link to="/cfp" style={styles.a.white}>
              <Button color="inherit">CfP</Button>
            </Link>
            <Link to="/cfs" style={styles.a.white}>
              <Button color="inherit">CfS</Button>
            </Link>
            <Link to="/coc" style={styles.a.white}>
              <Button color="inherit">CoC</Button>
            </Link>
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
}


export default withRouter(Template)
