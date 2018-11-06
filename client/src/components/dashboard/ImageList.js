import React, { Component } from 'react'
import { connect } from 'react-redux'

class ImageList extends Component {
  constructor() {
    super()
    this.state = {
      project: []
    }
  }

  getAllImages() {
    let imageList = []
    if (this.props.project) {
      const project = this.props.project
      for (let img of project.images) {
        let imgSrc = `/public/${project._id}/${img.originalName}`
        imageList.push(
          <li key={img._id}>
            <img src={imgSrc} alt="" style={{ width: '60px' }} />
            {img.originalName}
          </li>
        )
      }
    }
    return imageList
  }

  render() {
    return (
      <div>
        <ul>{this.getAllImages()}</ul>
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(ImageList)
