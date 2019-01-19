import React from 'react'
import { observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Template from 'templates/default'
import PriceBox from 'components/organisms/price-box'
import store from 'store'
import styles from './styles'

@observer
class CfS extends React.Component {
  componentWillMount() {
    store.title.title = 'Call for Sponsors'
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const result = await store.cfs.send()
    if (result.status >= 400) {
      store.error.message = result.error
      store.error.open = true
    } else {
      store.cfs.email = ''
      store.cfs.organization = ''
      store.cfs.message = ''
    }
  }

  handleEmail = (event) => {
    store.cfs.email = event.target.value
  }

  handleOrganization = (event) => {
    store.cfs.organization = event.target.value
  }

  handleMessage = (event) => {
    store.cfs.message = event.target.value
  }

  render() {
    return (
      <Template style={{}}>
        <Paper style={styles.root}>
          <h1 style={styles.h1}>Call for Sponsors</h1>
          <PriceBox
            price="900+ &euro;"
            name="Diamond"
            backgroundColor="white"
          >
            <ul style={styles.list}>
              <li style={styles.point}>
                Listing your Python related job offers for one year on our website
              </li>
              <li style={styles.point}>
                Emailing your Python related job offers to our list of subscribers for one year
              </li>
              <li style={styles.point}>
                Emailing your Python related events to our list of subscribers
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
                We will dristribute your company&amp;s promotional material on our conference
              </li>
            </ul>
          </PriceBox>
          <PriceBox
            price="500 - 900 &euro;"
            name="Gold"
            backgroundColor="#d3af37"
          >
            <ul style={styles.list}>
              <li style={styles.point}>
                Your logo will be on our website
              </li>
              <li style={styles.point}>
                Emailing your Python related job offers to our list of subscribers for one year
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
                We will dristribute your company&amp;s promotional material on our conference
              </li>
            </ul>
          </PriceBox>
          <PriceBox
            price="300 - 500 &euro;"
            name="Silver"
            backgroundColor="#adb3c1"
          >
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
                We will dristribute your company&amp;s promotional material on our conference
              </li>
            </ul>
          </PriceBox>
          <PriceBox
            price="100 - 300 &euro;"
            name="Bronze"
            backgroundColor="#ffb66e"
          >
            <ul style={styles.list}>
              <li style={styles.point}>
                Your logo will be on our website
              </li>
              <li style={styles.point}>
                You will get one conference pass
              </li>
              <li style={styles.point}>
                We will dristribute your company&amp;s promotional material on our conference
              </li>
              <li style={styles.point}>
                We will post an official &quot;thank you&quot; note on social media
              </li>
            </ul>
          </PriceBox>
          <PriceBox
            price="50 - 100 &euro;"
            name="Copper"
            backgroundColor="#ffbd8e"
          >
            <ul style={styles.list}>
              <li style={styles.point}>
                We will post an official &quot;thank you&quot; note on social media
              </li>
              <li style={styles.point}>
                You will get one conference pass
              </li>
            </ul>
          </PriceBox>
          <div style={styles.caption}>
            Click on price to open the box.
          </div>
          <div style={styles.text}>
            <p style={styles.paragraph}>
              The main idea of this conference is to bring together experts
              from academia &amp; business with young people who want to lear more
              about Python. Our goal is not just to promote Python but also to
              connect developers with companies who use Python.
            </p>
            <p style={styles.paragraph}>
              We believe that if we get to know each other better and exchange
              ideas we can create a stronger community that can work together
              on different projects.
            </p>
            <p style={styles.paragraph}>
              That is the main reason why we are offering our sponsoring
              companies an opportunity to present their work in the business
              room. Every company that donates more than 300 euros will get one
              business presentation where you can talk about your projects,
              ideas and hiring process. In the end of the business talks we
              highly encourage your HR to continue with the sourcing process if
              you find a desirable candidate.
            </p>
            <p style={styles.paragraph}>
              After the conference we are planning to open a PyDev mailing list.
              Since we strongly believe in privacy of our developers this
              mailing list will only be used to promote job offers from our gold
              and diamond sponsors. The email list will never be used for spam or
              sold to a third party.
            </p>
            <p style={styles.paragraph}>
              To our diamond sponsors we specially offer an opportunity to
              promote their job offers on our job board that will be available
              after the conference.
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
                onChange={this.handleEmail}
                label="EMail"
                value={store.cfs.email}
                type="email"
                required
                autoFocus
                fullWidth
              />
              <TextField
                onChange={this.handleOrganization}
                label="Organization"
                value={store.cfs.organization}
                required
                fullWidth
              />
              <TextField
                onChange={this.handleMessage}
                label="Message"
                value={store.cfs.message}
                required
                fullWidth
                multiline
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


export default CfS
