import React from 'react'
import { withStore } from 'store'

// Components
import {
  Button,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Paper,
  TextField,
} from '@material-ui/core'

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Template from 'templates/default/detail'
import styles from './styles'


class CfS extends React.Component {
  state = {
    email: '',
    organization: '',
    message: '',
  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  handleOrganization = (event) => {
    this.setState({ organization: event.target.value })
  }

  handleMessage = (event) => {
    this.setState({ message: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { cfs } = this.props.store
    cfs.send(this.state)
  }

  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.title.main}>Call for Sponsors</h1>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={styles.diamond}
            >
              900+ &euro; (Diamond)
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul style={styles.list}>
                <li style={styles.point}>
                  We will organize one month Python training session for your
                  juniors/interns
                </li>
                <li style={styles.point}>
                  Emailing your Python related events to our list of
                  subscribers
                </li>
                <li style={styles.point}>
                  5 conference passes
                </li>
                <li style={styles.point}>
                  You can present the work of your company in the business room
                </li>
                <li style={styles.point}>
                  Logo on Conference Videos
                </li>
                <li style={styles.point}>
                  Logo on our t-shirts
                </li>
                <li style={styles.point}>
                  Logo and text on lanyards
                </li>
                <li style={styles.point}>
                  We will distribute your company's promotional material on our
                  conference
                </li>
                <li style={styles.point}>
                  We will post an official &quot;thank you&quot; note on social
                  media
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={styles.gold}
            >
              500 - 899 &euro; (Gold)
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul style={styles.list}>
                <li style={styles.point}>
                  Your logo will be on our website
                </li>
                <li style={styles.point}>
                  5 conference passes
                </li>
                <li style={styles.point}>
                  You can present the work of your company in the business room
                </li>
                <li style={styles.point}>
                  Logo on our t-shirts
                </li>
                <li style={styles.point}>
                  Logo on Conference Videos
                </li>
                <li style={styles.point}>
                  We will distribute your company's promotional material on our conference
                </li>
                <li style={styles.point}>
                  We will post an official &quot;thank you&quot; note on social media
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={styles.silver}
            >
              300 - 499 &euro; (Silver)
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul style={styles.list}>
                <li style={styles.point}>
                  Your logo will be on our website
                </li>
                <li style={styles.point}>
                  3 conference passes
                </li>
                <li style={styles.point}>
                  You can present the work of your company in the business room
                </li>
                <li style={styles.point}>
                  Logo on our t-shirts
                </li>
                <li style={styles.point}>
                  Logo on Conference Videos
                </li>
                <li style={styles.point}>
                  We will distribute your company's promotional material on our conference
                </li>
                <li style={styles.point}>
                  We will post an official &quot;thank you&quot; note on social media
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={styles.bronze}
            >
              100 - 299 &euro; (Bronze)
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul style={styles.list}>
                <li style={styles.point}>
                  Your logo will be on our website
                </li>
                <li style={styles.point}>
                  You will get one conference pass
                </li>
                <li style={styles.point}>
                  We will post an official &quot;thank you&quot; note on social media
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={styles.copper}
            >
              50 - 99 &euro; (Copper)
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ul style={styles.list}>
                <li style={styles.point}>
                  We will post an official &quot;thank you&quot; note on social media
                </li>
                <li style={styles.point}>
                  You will get one conference pass
                </li>
              </ul>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div style={styles.description}>
            Click on price to open the box.
          </div>
          <h2 style={styles.title}>Why should you sponsor PySer?</h2>
          <div style={styles.text}>
            <p style={styles.paragraph}>
              <b>Promote your company!</b>
              &nbsp;
              The main idea of this conference is
              to bring together well known Python experts from academia &amp;
              business and connect them with young people who want to learn more
              about Python. Our goal is not just to promote Python but also to
              connect developers with companies who use it in their projects.
            </p>
            <p style={styles.paragraph}>
              <b>
                Do you have a product, service or brand that is loved by
                or will be loved by the Python developers?
              </b>
            </p>
            <p style={styles.paragraph}>
              We know that you are doing a fantastic job and that is the
              main reason why we are offering our sponsoring companies
              an opportunity to present their work in the business room.
              Every company that donates more than 300 euros will get one
              business presentation where you can talk about your projects,
              ideas and hiring processes.
            </p>
            <p style={styles.paragraph}>
              We believe that if we get to know each other better and exchange
              ideas we can create a stronger community that can work together
              on different projects.
            </p>
            <p style={styles.paragraph}>
              In the end of the business talks we
              highly encourage your HR to continue with the sourcing process if
              you find a desirable candidate.
            </p>
            <p style={styles.paragraph}>
              We are open for any additional ideas you might have on how to
              promote Python and create stronger ties in our community. Contact
              us if you are interested in learning more about the sponsoring
              options.
            </p>
          </div>
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <div style={styles.form.content}>
              <TextField
                required
                fullWidth
                onChange={this.handleEmail}
                label="EMail"
                type="email"
                value={this.state.email}
              />
              <TextField
                required
                fullWidth
                onChange={this.handleOrganization}
                label="Organization"
                value={this.state.organization}
              />
              <TextField
                required
                fullWidth
                multiline
                onChange={this.handleMessage}
                label="Message"
                value={this.state.message}
              />
              <Button
                type="submit"
                style={styles.button}
                variant="outlined"
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Template>
    )
  }
}


export default withStore(CfS)
