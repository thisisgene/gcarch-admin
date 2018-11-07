import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { uploadImages } from '../../actions/imageActions'

class ImageUpload extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
      id: ''
    }
  }

  componentDidMount() {
    if (this.props) {
      this.setState({ id: this.props.project._id })
    }
  }

  onDrop = files => {
    console.log(files)
    this.setState({ files: files })
    this.props.uploadImages(files, this.state.id, 'project')
  }

  onCancel = () => {
    this.setState({
      files: []
    })
  }

  render() {
    return (
      <div>
        <div className="dropzone">
          <Dropzone
            accept="image/*"
            onDrop={this.onDrop}
            onFileDialogCancel={this.onCancel}
            name="images"
          >
            {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (acceptedFiles.length || rejectedFiles.length) {
                return `Accepted ${acceptedFiles.length}, rejected ${
                  rejectedFiles.length
                } files`
              }
              if (isDragAccept) {
                return 'This file is authorized'
              }
              if (isDragReject) {
                return 'This file is not authorized'
              }
              return 'Try dropping some files.'
            }}
          </Dropzone>
        </div>
        {/* <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside> */}
      </div>
    )
  }
}

// ImageUpload.propTypes = {
//   uploadImages: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   project: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
//

// const mapStateToProps = state => ({
//   auth: state.auth,
//   project: state.project,
//   errors: state.errors
// })

export default connect(
  null,
  { uploadImages }
)(ImageUpload)
// export default ImageUpload
