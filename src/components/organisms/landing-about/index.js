import React from 'react'
import ResolutionContext from 'resolution'
import LandingAbout from './about'


class LandingAboutResolution extends React.Component {
  render() {
    return (
      <ResolutionContext.Consumer>
        {resolution => <LandingAbout {...this.props} resolution={resolution} />}
      </ResolutionContext.Consumer>
    )
  }
}


export default LandingAboutResolution
