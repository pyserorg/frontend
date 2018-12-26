import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
import LandingOrganizers from 'components/organisms/landing-organizers'
import LandingSponsors from 'components/organisms/landing-sponsors'
import LandingTalks from 'components/organisms/landing-talks'
import Template from 'templates/default'
import titleActions from 'templates/default/actions'


const mapStateToProps = () => ({})


class Landing extends Component {
  componentWillMount() {
    this.props.requestTitle('Landing')
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
  requestTitle: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, titleActions)(
  Landing,
)
