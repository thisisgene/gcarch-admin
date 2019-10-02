import React, { Component } from 'react'

import SelectFieldGroup from '../common/SelectFieldGroup'

import { rankOptions } from '../../config/config'

import cx from 'classnames'
import globalStyles from '../common/Bootstrap.module.css'
import commonStyles from '../common/Common.module.sass'

export default class ImageListItem extends Component {
  state = {
    imgLoaded: false,
    imgWidth: '',
    imgHeight: ''
  }
  getImgDimensions = img => {
    console.log('img load:', img.target.naturalWidth)
    this.setState({
      imgLoaded: true,
      imgWidth: img.target.naturalWidth,
      imgHeight: img.target.naturalHeight
    })
  }

  render() {
    const {
      project,
      img,
      i,
      waiting,
      onChange,
      updatePosition,
      onRadioClick,
      onCheckboxClick,
      onHalfSizeClick,
      onClickDelete
    } = this.props

    const posOptions = ['-']
    for (let i = 1; i <= rankOptions; i++) {
      posOptions.push(i.toString())
    }

    return (
      <tr key={i} style={waiting ? { opacity: '.5' } : { opacity: '1' }}>
        <td>
          <div>
            <img
              onLoad={this.getImgDimensions.bind(this)}
              src={`/assets/projekte/${project._id}/${img.originalName}`}
              alt=""
              style={{ width: '60px' }}
            />

            <div style={{ fontSize: '.8rem' }}>
              {this.state.imgLoaded ? (
                <div>
                  {this.state.imgWidth}x{this.state.imgHeight}
                </div>
              ) : (
                <div> Loading... </div>
              )}
            </div>
          </div>
        </td>

        <td>
          <SelectFieldGroup
            name={`placeInGrid_${i}`}
            onChange={updatePosition.bind(
              this,
              project._id,
              project.name,
              img._id,
              img.originalName,
              i
            )}
            options={posOptions}
            value={img.gridPosition}
          />
        </td>
        <td>
          <input
            type="radio"
            name={`optcover_${i}`}
            // className={globalStyles['form-control']}
            // style={{ margin: '0 !important' }}
            onClick={onRadioClick.bind(this, project._id, img._id)}
            onChange={onChange.bind(this, `radio_${i}`)}
            checked={
              project.backgroundImage && img._id === project.backgroundImage._id
            }
          />
        </td>
        <td>
          <input
            name="halfSize"
            type="checkbox"
            // className={globalStyles['form-control']}
            onClick={onHalfSizeClick.bind(this, project._id, img._id)}
            onChange={onChange.bind(this, `check2_${i}`)}
            defaultChecked={img.isHalfSize}
          />
        </td>
        <td>
          <input
            name="visibility"
            type="checkbox"
            // className={globalStyles['form-control']}
            onClick={onCheckboxClick.bind(this, project._id, img._id)}
            onChange={onChange.bind(this, `check_${i}`)}
            defaultChecked={img.isVisible}
          />
        </td>
        <td>
          <button
            className={cx(globalStyles['btn'], globalStyles['btn-link'])}
            onClick={onClickDelete}
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
