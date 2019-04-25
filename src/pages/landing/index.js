import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
import LandingOrganizers from 'components/organisms/landing-organizers'
import LandingSponsors from 'components/organisms/landing-sponsors'
import LandingTalks from 'components/organisms/landing-talks'
import Template from 'templates/default'
import store from 'store'


@observer
class Landing extends React.Component {
  componentWillMount() {
    store.title.title = 'Landing'
    const year = Number(this.props.match.params.year)
    if (year) {
      store.event.detail.year = year
    }
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      year: PropTypes.string,
    }).isRequired,
  }).isRequired,
}


export default Landing
