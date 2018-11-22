import React, { Component } from 'react'

import cx from 'classnames'
import gridStyles from './ProjectGrid.module.sass'

class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: this.props.project,
      position: this.props.position
    }
    console.log(this.state.project)
  }
  render() {
    const project = this.props.project
    const imgSrc = `/public/${project.projectId}/${project.imageName}`
    return (
      <div>
        {/* <img src={imgSrc} alt="" /> */}
        <p>{project.position}</p>
        <p>{project.projectName}</p>
        <p>{project.imageName}</p>
        <div className={gridStyles['img-tag-container']}>
          <div className={gridStyles['img-tag']}>
            <p className={gridStyles['img-name']}>{project.projectName}</p>
            <p className={gridStyles['img-location']}>Wien Simmering</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectPreview
