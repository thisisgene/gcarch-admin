import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { deleteImage } from '../../actions/imageActions'

class ImageList extends Component {
  constructor() {
    super()
    this.state = {
      project: []
    }
  }

  onClickDelete = e => {
    const data = e.currentTarget.dataset
    const imgid = data.img_id
    const projectid = data.project_id
    this.props.deleteImage(projectid, imgid, this.props.history)
  }

  getAllImages() {
    let imageList = []
    if (this.props.project) {
      const { project, waiting } = this.props.project
      for (let img of project.images) {
        if (!img.isDeleted && img.isVisible) {
          let imgSrc = `/public/${project._id}/${img.originalName}`
          imageList.push(
            <li
              key={img._id}
              style={waiting ? { opacity: '.5' } : { opacity: '1' }}
            >
              <img src={imgSrc} alt="" style={{ width: '60px' }} />
              {img.originalName}
              <button
                className="btn btn-link"
                onClick={this.onClickDelete}
                data-img_id={img._id}
                data-project_id={project._id}
              >
                <i className="fa fa-minus-circle" />
              </button>
            </li>
          )
        }
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

// ImageList.propTypes = {
//   deleteImages: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   project: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   project: state.project,
//   errors: state.errors
// })

export default connect(
  null,
  { deleteImage }
)(withRouter(ImageList))
