import React from 'react'
import { withStore } from 'store'

// Components
import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
import LandingOrganizers from 'components/organisms/landing-organizers'
import LandingSponsors from 'components/organisms/landing-sponsors'

import Template from 'templates/default/detail'


class Landing extends React.Component {
  componentDidMount = () => {
    const { match, store } = this.props
    if (match.params.year) {
      store.event.fetch(match.params.year)
    }
  }
  render() {
    return (
      <Template style={{}}>
        <LandingInfo />
        <LandingAbout />
        <LandingSponsors />
        <LandingOrganizers />
      </Template>
    )
  }
}


export default withStore(Landing)
