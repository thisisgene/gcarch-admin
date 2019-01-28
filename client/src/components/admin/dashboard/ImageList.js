import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deleteImage } from '../../../actions/imageActions'
import {
  setGridPosition,
  setBackgroundImage,
  setImageVisibility
} from '../../../actions/imageActions'

import SelectFieldGroup from '../common/SelectFieldGroup'

import cx from 'classnames'
import globalStyles from '../common/Bootstrap.module.css'
import commonStyles from '../common/Common.module.sass'
import styles from './projects/Projects.module.sass'

class ImageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: [],
      description: '',
      name: '',
      values: [],
      value: '',
      positions: props.positions
    }
  }

  onChange = (i, e) => {
    const target = e.target
    let values = [...this.state.values]
    const value = target.type === 'checkbox' ? target.checked : target.value
    values[i] = value
    this.setState({ values })
  }

  updatePosition = (projectId, projectName, imageId, imgName, i, e) => {
    this.props.setGridPosition(
      projectId,
      projectName,
      imageId,
      imgName,
      e.target.value
    )
  }

  onRadioClick = (projectId, imageId) => {
    this.props.setBackgroundImage(projectId, imageId)
  }
  onCheckboxClick = (projectId, imageId, e) => {
    console.log(e.target.checked)
    this.props.setImageVisibility(projectId, imageId, e.target.checked)
  }

  onClickDelete = e => {
    const data = e.currentTarget.dataset
    const imgid = data.img_id
    const projectid = data.project_id
    this.props.deleteImage(projectid, imgid, 'project')
  }

  getAllImages() {
    let imageList = []
    if (this.props.project.project) {
      const { project, waiting } = this.props.project
      let options = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

      for (let [i, img] of project.images.entries()) {
        if (!img.isDeleted) {
          let imgSrc = `/assets/projekte/${project._id}/${img.originalName}`
          imageList.push(
            <tr
              // className={globalStyles['form-inline']}
              key={img._id}
              style={waiting ? { opacity: '.5' } : { opacity: '1' }}
            >
              <td>
                <img src={imgSrc} alt="" style={{ width: '60px' }} />
              </td>
              {/* <td>
                <input
                  name={`description_${i}`}
                  className={cx(
                    globalStyles['form-control'],
                    commonStyles['dark-input']
                  )}
                  type="text"
                  value={this.state[`description_${i}`]}
                  onChange={this.onChange.bind(this, `description_${i}`)}
                />
              </td> */}
              <td>
                <SelectFieldGroup
                  name={`placeInGrid_${i}`}
                  onChange={this.updatePosition.bind(
                    this,
                    project._id,
                    project.name,
                    img._id,
                    img.originalName,
                    i
                  )}
                  options={options}
                  value={img.gridPosition}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`optcover_${i}`}
                  // className={globalStyles['form-control']}
                  // style={{ margin: '0 !important' }}
                  onClick={this.onRadioClick.bind(this, project._id, img._id)}
                  onChange={this.onChange.bind(this, `radio_${i}`)}
                  checked={
                    project.backgroundImage &&
                    img._id === project.backgroundImage._id
                  }
                />
              </td>
              <td>
                <input
                  name="visibility"
                  type="checkbox"
                  // className={globalStyles['form-control']}
                  onClick={this.onCheckboxClick.bind(
                    this,
                    project._id,
                    img._id
                  )}
                  onChange={this.onChange.bind(this, `check_${i}`)}
                  defaultChecked={img.isVisible}
                />
              </td>
              <td>
                <button
                  className={cx(globalStyles['btn'], globalStyles['btn-link'])}
                  onClick={this.onClickDelete}
                  data-img_id={img._id}
                  data-project_id={project._id}
                >
                  <i className="fa fa-minus-circle" />
                </button>
              </td>
            </tr>
          )
        }
      }
    }
    return imageList
  }

  render() {
    return (
      <div className={styles['image-list']}>
        <table className={styles['image-table']}>
          <thead>
            <tr>
              <th>Bild</th>
              <th># auf Raster</th>
              <th>Hintergrund</th>
              <th>Wird angezeigt</th>
              <th>Löschen</th>
            </tr>
          </thead>
          <tbody>{this.getAllImages()}</tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project,
  // positions: state.positions,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { deleteImage, setGridPosition, setBackgroundImage, setImageVisibility }
)(ImageList)
