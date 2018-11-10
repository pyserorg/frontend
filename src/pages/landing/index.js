import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import LandingAbout from 'components/organisms/landing-about'
import LandingInfo from 'components/organisms/landing-info'
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
      <Template>
        <LandingInfo />
        <LandingAbout />
        <LandingTalks />
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
