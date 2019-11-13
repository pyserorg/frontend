import React from 'react'
import { Link } from 'react-router-dom'
import {
  Paper,
} from '@material-ui/core'
import Template from 'templates/default/detail'
import styles from './styles'


class Volunteering extends React.Component {
  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.title.main}>Volunteering</h1>
          <p style={styles.paragraph}>
            Conference is nothing without volunteers.
            Help us make the conference great!
          </p>
          <Link to="/login">Login</Link>
          &nbsp;or&nbsp;
          <Link to="/register">Register</Link>
        </Paper>
      </Template>
    );
  }
}


export default Volunteering
