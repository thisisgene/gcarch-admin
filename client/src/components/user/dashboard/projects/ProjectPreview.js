import React, { Component } from 'react'

// import cx from 'classnames'

// import lowRes from '../../common/test.jpg'

import cx from 'classnames'
import gridStyles from './ProjectGrid.module.sass'

class ProjectPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: this.props.project,
      image: this.props.image,
      position: this.props.position,
      thumbLoaded: true,
      imgLoaded: false
    }
  }

  onThumbLoaded = () => {
    this.setState({ thumbLoaded: true })
  }

  onImgLoaded = () => {
    this.setState({ imgLoaded: true }, () => {})
  }

  render() {
    const project = this.props.project
    const image = this.props.image
    const position = this.props.position
    // const lowResSrc = `/assets/projekte/${project._id}/min/${
    //   image.originalName
    // }`
    const imgSrc = `/assets/projekte/${project._id}/${image.originalName}`

    return (
      <div
        className={cx(gridStyles['img-container'], {
          [gridStyles['thumb-loaded']]: this.state.thumbLoaded
        })}
        // style={{ backgroundImage: `url(${lowResSrc})` }}
      >
        <img
          src={imgSrc}
          alt={image.originalName}
          onLoad={this.onImgLoaded}
          className={cx(gridStyles['img'], {
            [gridStyles['loaded']]: this.state.imgLoaded
          })}
        />
        {/* <img
          className={gridStyles['fake-thumb']}
          src={lowResSrc}
          onLoad={this.onThumbLoaded}
        /> */}
        {/* <img src={lowResSrc} alt="" className={StyleSheet['low-res-img']} /> */}
        {/* <p>{position}</p> */}
        {/* <p>{project.name}</p> */}
        <div className={gridStyles['img-tag-container']}>
          <div className={gridStyles['img-tag']}>
            <p className={gridStyles['img-name']}>{project.name}</p>
            <p className={gridStyles['img-location']}>{project.location}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectPreview
