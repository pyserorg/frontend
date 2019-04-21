import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// Components
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuItem from '@material-ui/core/MenuItem'
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
    submitting: false,
  }

  componentWillMount() {
    store.title.title = 'Call for Papers'
  }

  handleFieldChange = (type, field) => (event) => {
    const { value } = event.target
    store.cfp[type][field] = value
  }

  handleNext = (event) => {
    event.preventDefault()
    this.setState(prevState => ({ step: prevState.step + 1 }))
  }

  handlePrevious = (event) => {
    event.preventDefault()
    this.setState(prevState => ({ step: prevState.step - 1 }))
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ submitting: true })
    const data = await store.cfp.send()
    this.setState({ submitting: false })
    if (data.status === 200) {
      if (store.auth.auth) {
        this.props.history.push(`/cfp/${data.result.id}`)
      } else {
        store.error.message = 'Your talk was submitted'
        store.error.open = true
        store.cfp.talk = {
          id: 0,
          description: '',
          duration: 30,
          published: false,
          title: '',
          type: 'presentations',
        }
        store.cfp.person = {
          id: 0,
          bio: '',
          email: '',
          facebook: '',
          firstName: '',
          lastName: '',
          twitter: '',
          password: '',
          passwordRepeat: '',
        }
        this.setState({ step: 0 })
      }
    } else {
      store.error.message = data.error
      store.error.open = true
    }
  }

  render() {
    const buttons = this.state.submitting
      ? (
        <div style={styles.talk}>
          <CircularProgress />
        </div>
      ) : (
        <div style={styles.talk}>
          <Button
            onClick={this.handlePrevious}
            variant="outlined"
            style={styles.talk.previous}
          >
            Previous
          </Button>
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </div>
      )
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1>Call for Papers</h1>
          <span>Open until 5th of May 2019</span>
          <Stepper activeStep={this.state.step} orientation="vertical">
            <Step>
              <StepLabel>Presenter</StepLabel>
              <StepContent>
                <form style={styles.form} onSubmit={this.handleNext}>
                  <TextField
                    label="First Name"
                    onChange={this.handleFieldChange('person', 'firstName')}
                    value={store.cfp.person.firstName}
                    autoFocus
                    required
                  />
                  <TextField
                    label="Last Name"
                    onChange={this.handleFieldChange('person', 'lastName')}
                    value={store.cfp.person.lastName}
                    required
                  />
                  <TextField
                    label="Email"
                    onChange={this.handleFieldChange('person', 'email')}
                    value={store.cfp.person.email}
                    type="email"
                    required
                  />
                  <TextField
                    label="Password"
                    onChange={this.handleFieldChange('person', 'password')}
                    value={store.cfp.person.password}
                    type="password"
                    required
                  />
                  <TextField
                    label="Repeat Password"
                    onChange={this.handleFieldChange('person', 'passwordRepeat')}
                    value={store.cfp.person.passwordRepeat}
                    type="password"
                    required
                  />
                  <TextField
                    label="Facebook"
                    onChange={this.handleFieldChange('person', 'facebook')}
                    value={store.cfp.person.facebook}
                  />
                  <TextField
                    label="Twitter"
                    onChange={this.handleFieldChange('person', 'twitter')}
                    value={store.cfp.person.twitter}
                  />
                  <TextField
                    label="Biography"
                    onChange={this.handleFieldChange('person', 'bio')}
                    value={store.cfp.person.bio}
                    required
                    rows={6}
                    multiline
                  />
                  <Button type="submit">Next</Button>
                </form>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Talk</StepLabel>
              <StepContent>
                <form style={styles.form} onSubmit={this.handleSubmit}>
                  <TextField
                    label="Title"
                    onChange={this.handleFieldChange('talk', 'title')}
                    value={store.cfp.talk.title}
                    autoFocus
                    required
                  />
                  <TextField
                    label="Description"
                    onChange={this.handleFieldChange('talk', 'description')}
                    value={store.cfp.talk.description}
                    required
                    rows={6}
                    multiline
                  />
                  <TextField
                    label="Duration"
                    select
                    required
                    value={store.cfp.talk.duration}
                    onChange={this.handleFieldChange('talk', 'duration')}
                    margin="normal"
                  >
                    <MenuItem value={30}>
                      30
                    </MenuItem>
                    <MenuItem value={45}>
                      45
                    </MenuItem>
                    <MenuItem value={60}>
                      60
                    </MenuItem>
                    <MenuItem value={90}>
                      90
                    </MenuItem>
                  </TextField>
                  <TextField
                    label="Type"
                    select
                    required
                    value={store.cfp.talk.hall}
                    onChange={this.handleFieldChange('talk', 'hall')}
                    margin="normal"
                  >
                    <MenuItem value="presentations">
                      presentation
                    </MenuItem>
                    <MenuItem value="workshops">
                      workshop
                    </MenuItem>
                  </TextField>
                  {buttons}
                </form>
              </StepContent>
            </Step>
          </Stepper>
        </Paper>
      </Template>
    )
  }
}


CfP.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}


export default CfP
