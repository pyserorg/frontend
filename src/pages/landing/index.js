import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
import LandingOrganizers from 'components/organisms/landing-organizers'
import LandingSponsors from 'components/organisms/landing-sponsors'
import LandingTalks from 'components/organisms/landing-talks'
import Template from 'templates/default'
import store from 'store'


class Landing extends Component {
  componentWillMount() {
    this.props.store.title.title = 'Landing'
  }

  render() {
    return (
      <Template style={{}}>
        <LandingInfo />
        <LandingAbout />
        <LandingTalks />
        <LandingSponsors />
        <LandingOrganizers />
      </Template>
    )
  }
}


Landing.propTypes = {
  store: PropTypes.shape({
    title: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}


export default observer((props) => <Landing {...props} store={store} />)
