import React from 'react'
import ResolutionContext from 'resolution'
import Template from './template'


class TemplateResolution extends React.Component {
  render() {
    return (
      <ResolutionContext.Consumer>
        {resolution => <Template {...this.props} resolution={resolution} />}
      </ResolutionContext.Consumer>
    )
  }
}


export default TemplateResolution
