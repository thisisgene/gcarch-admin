import React, { Component } from 'react'

import cx from 'classnames'
import gridStyles from './ProjectGrid.module.sass'

class ProjectPreview extends Component {
  render() {
    return (
      <div>
        <p>{this.props.position}</p>
        {/* <img src="https://placeimg.com/640/480/arch" alt="" /> */}
      </div>
    )
  }
}

export default ProjectPreview
