import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
import LandingOrganizers from 'components/organisms/landing-organizers'
import LandingSponsors from 'components/organisms/landing-sponsors'
import LandingTalks from 'components/organisms/landing-talks'
import Template from 'templates/default'
import NoPage from 'pages/nopage'
import store from 'store'


@observer
class Landing extends React.Component {
  componentWillMount() {
    store.title.title = 'Landing'
    this.year = Number(this.props.match.params.year)
    if (this.year) {
      store.event.detail.year = this.year
    }
  }

  render() {
    const years = store.event.list.data.map(event => event.year)
    return years.includes(this.year) || this.props.match.params.year === 'landing'
      ? (
        <Template style={{}}>
          <LandingInfo />
          <LandingAbout />
          <LandingTalks />
          <LandingSponsors />
          <LandingOrganizers />
        </Template>
      ) : <NoPage />
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
