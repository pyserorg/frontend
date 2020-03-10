import React from 'react'
import { withStore } from 'freenit'

// Components
import {
  LandingAbout,
  LandingInfo,
  LandingOrganizers,
  // LandingSponsors,
} from 'components'

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
        {/* <LandingSponsors /> */}
        <LandingOrganizers />
      </Template>
    )
  }
}


export default withStore(Landing)
