import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'

import { uploadImages } from '../../../actions/imageActions'

import commonStyles from '../common/Common.module.sass'

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
        <div className={commonStyles['dropzone']}>
          <Dropzone
            className={commonStyles['dropzone-inner']}
            accept="image/*"
            onDrop={this.onDrop}
            onFileDialogCancel={this.onCancel}
            name="images"
          >
            {({ isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (acceptedFiles.length || rejectedFiles.length) {
                return `Akzeptiert: ${acceptedFiles.length}, abgelehnt: ${
                  rejectedFiles.length
                }`
              }
              if (isDragAccept) {
                return 'Gültiges Format.'
              }
              if (isDragReject) {
                return 'Ungültiges Format. Nur Bilddateien erlaubt.'
              }
              return (
                <p>
                  <i className="dropzone-image fa fa-image" /> Bilder hier
                  hochladen.
                </p>
              )
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
