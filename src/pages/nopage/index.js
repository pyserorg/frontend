import React from 'react'

// Components
import {
  Paper,
} from '@material-ui/core'

import Template from 'templates/empty'
import styles from './styles'


export default class NoPage extends React.Component {
  render() {
    return (
      <Template.detail style={{}}>
        <Paper style={styles.root}>
          <h1>No Such Page</h1>
        </Paper>
      </Template.detail>
    )
  }
}
