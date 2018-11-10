import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import styles from './styles'


export default class NoPage extends Component {
  render() {
    return (
      <Paper style={styles.root}>
        <h1>No Such Page</h1>
      </Paper>
    )
  }
}
