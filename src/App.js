import React from 'react'
import StoreProvider from 'store/provider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Style } from 'radium'
import { ThemeProvider } from '@material-ui/styles'

import Routing from 'routing'
import theme from 'theme'
import styles from 'styles'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Style rules={styles} />
        <Router>
          <StoreProvider>
            <Routing />
          </StoreProvider>
        </Router>
    </ThemeProvider>
  )
}


export default App
