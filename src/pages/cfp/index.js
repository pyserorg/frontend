import React from 'react'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import TextField from '@material-ui/core/TextField'

import Template from 'templates/default'
import store from 'store'
import styles from './styles'

@observer
class CfP extends React.Component {
  state = {
    step: 0,
    person: {
      bio: '',
      email: '',
      facebook: '',
      first: '',
      last: '',
      twitter: '',
    },
    talk: {
      description: '',
      title: '',
      type: null,
      duration: null,
    },
  }

  componentWillMount() {
    store.title.title = 'Call for Papers'
  }

  handleFieldChange = (type, field) => (event) => {
    this.setState({
      [type]: {
        [field]: event.target.value,
      },
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState(prevState => ({
      step: (prevState.step + 1) % 2,
    }))
  }

  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <Stepper activeStep={this.state.step} orientation="vertical">
            <Step>
              <StepLabel>First</StepLabel>
              <StepContent>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                  <TextField
                    label="First Name"
                    onChange={this.handleFieldChange('person', 'first')}
                    value={this.state.person.first}
                  />
                  <TextField
                    label="Last Name"
                    onChange={this.handleFieldChange('person', 'last')}
                    value={this.state.person.last}
                  />
                  <Button type="submit">Next</Button>
                </form>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Second</StepLabel>
              <StepContent>
                <form onSubmit={this.handleSubmit}>
                  <TextField label="second" />
                  <Button type="submit">Next</Button>
                </form>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      </Template>
    )
  }
}


export default CfP
