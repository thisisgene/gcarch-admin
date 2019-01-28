import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'

import { uploadImages } from '../../../actions/imageActions'

import commonStyles from '../common/Common.module.sass'
import styles from './projects/Projects.module.sass'

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
      this.setState({ id: this.props.id })
    }
  }

  onDrop = files => {
    console.log(files)
    this.setState({ files: files })
    this.props.uploadImages(files, this.state.id, this.props.category)
  }

  onCancel = () => {
    this.setState({
      files: []
    })
  }

  render() {
    return (
      <div className={styles['image-upload']}>
        <div className={commonStyles['dropzone']}>
          <Dropzone
            className={commonStyles['dropzone-inner']}
            accept="image/*"
            onDrop={this.onDrop}
            onFileDialogCancel={this.onCancel}
            name="file"
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
      </div>
    )
  }
}

export default connect(
  null,
  { uploadImages }
)(ImageUpload)
// export default ImageUpload
