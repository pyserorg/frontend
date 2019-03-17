import React from 'react'
import ResolutionContext from 'resolution'
import LandingTalks from './talks'


class LandingTalksResolution extends React.Component {
  render() {
    return (
      <ResolutionContext.Consumer>
        {resolution => <LandingTalks {...this.props} resolution={resolution} />}
      </ResolutionContext.Consumer>
    )
  }
}


export default LandingTalksResolution
