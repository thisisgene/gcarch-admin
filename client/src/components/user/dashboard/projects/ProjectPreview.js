import React, { Component } from 'react'

import cx from 'classnames'
import gridStyles from './ProjectGrid.module.sass'

class ProjectPreview extends Component {
  render() {
    const project = this.props.project
    return (
      <div>
        <img src="https://placeimg.com/640/480/arch" alt="" />
        <div className={gridStyles['img-tag-container']}>
          <div className={gridStyles['img-tag']}>
            <p className={gridStyles['img-name']}>{project.name}</p>
            <p className={gridStyles['img-location']}>Wien Simmering</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectPreview
