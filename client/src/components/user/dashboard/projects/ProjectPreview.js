import React, { Component } from 'react'

// import cx from 'classnames'
import cx from 'classnames'
import gridStyles from './ProjectGrid.module.sass'

class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: this.props.project,
      image: this.props.image,
      position: this.props.position,
      doneLoading: false
    }
  }

  doneLoading = () => {
    this.setState({ doneLoading: true }, () => {})
  }

  render() {
    const project = this.props.project
    const image = this.props.image
    const position = this.props.position
    const imgSrc = `/public/${project._id}/${image.originalName}`
    return (
      <div className={gridStyles['img-container']}>
        <img
          src={imgSrc}
          alt={image.originalName}
          onLoad={this.doneLoading}
          className={cx(gridStyles['img'], {
            [gridStyles['loaded']]: this.state.doneLoading
          })}
        />
        {/* <p>{position}</p> */}
        {/* <p>{project.name}</p> */}
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
