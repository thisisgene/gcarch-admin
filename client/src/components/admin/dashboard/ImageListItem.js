import React, { Component } from 'react'

import SelectFieldGroup from '../common/SelectFieldGroup'

import cx from 'classnames'
import globalStyles from '../common/Bootstrap.module.css'
import commonStyles from '../common/Common.module.sass'

export default class ImageListItem extends Component {
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

  render() {
    const { project, img, i, waiting } = this.props
    return (
      <tr key={i} style={waiting ? { opacity: '.5' } : { opacity: '1' }}>
        <td>
          <img
            src={`/assets/projekte/${project._id}/${img.originalName}`}
            alt=""
            style={{ width: '60px' }}
          />
        </td>

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
            options={['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
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
              project.backgroundImage && img._id === project.backgroundImage._id
            }
          />
        </td>
        <td>
          <input
            name="visibility"
            type="checkbox"
            // className={globalStyles['form-control']}
            onClick={this.onCheckboxClick.bind(this, project._id, img._id)}
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
