import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import axios from 'axios'

import arrayMove from 'array-move'

import {
  setGridPosition,
  setBackgroundImage,
  deleteImage,
  setImageHalfSize,
  setImageVisibility
} from '../../../actions/imageActions'

import ImageListItem from './ImageListItem'

import styles from './projects/Projects.module.sass'

const SortableItem = SortableElement(
  ({
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
  }) => (
    <ImageListItem
      key={i}
      project={project}
      img={img}
      i={i}
      waitin={waiting}
      onChange={onChange}
      updatePosition={updatePosition}
      onRadioClick={onRadioClick}
      onCheckboxClick={onCheckboxClick}
      onHalfSizeClick={onHalfSizeClick}
      onClickDelete={onClickDelete}
    />
  )
)

const SortableList = SortableContainer(
  ({
    items,
    project,
    waiting,
    onChange,
    updatePosition,
    onRadioClick,
    onCheckboxClick,
    onHalfSizeClick,
    onClickDelete
  }) => {
    return (
      <table className={styles['image-table']}>
        <thead>
          <tr>
            <th>Bild</th>
            <th># auf Raster</th>
            <th>Hintergrund</th>
            <th>halbe Größe</th>
            <th>In 'mehr Info'</th>
            <th>Löschen</th>
          </tr>
        </thead>
        <tbody>
          {items && !items.noteam ? (
            items
              .filter(item => !item.isDeleted)
              .map((item, index) => (
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  project={project}
                  img={item}
                  waiting={waiting}
                  onChange={onChange}
                  updatePosition={updatePosition}
                  onRadioClick={onRadioClick}
                  onCheckboxClick={onCheckboxClick}
                  onHalfSizeClick={onHalfSizeClick}
                  onClickDelete={onClickDelete}
                />
              ))
          ) : (
            <p>Noch keine Einträge</p>
          )}
        </tbody>
      </table>
    )
  }
)

class ImageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: [],
      description: '',
      name: '',
      values: [],
      value: '',
      positions: props.positions,
      imageList: props.project.project.images
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project != this.props.project) {
      console.log(this.state.imageList)
      this.setState({ imageList: this.props.project.project.images })
      console.log(this.state.imageList)
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const imgArray = {}
    this.setState(
      ({ imageList }) => ({
        imageList: arrayMove(imageList, oldIndex, newIndex)
      }),
      () => {
        const promise = this.state.imageList.map((img, index) => {
          return (imgArray[img._id] = index)
        })
        Promise.all(promise).then(list => {
          console.log(imgArray)
          axios
            .post('/api/projects/images/sort', {
              imageList: imgArray,
              projectId: this.props.project.project._id
            })
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              if (err) console.log(err)
            })
        })
      }
    )
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

  onHalfSizeClick = (projectId, imageId, e) => {
    this.props.setImageHalfSize(projectId, imageId, e.target.checked)
  }

  onClickDelete = e => {
    const data = e.currentTarget.dataset
    const imgid = data.img_id
    const projectid = data.project_id
    this.props.deleteImage(projectid, imgid, 'project')
  }

  render() {
    const { project, waiting } = this.props.project
    return (
      <div>
        {project.images && (
          <div className={styles['image-list']}>
            <SortableList
              lockAxis={'y'}
              pressDelay={200}
              helperClass={styles['dragged']}
              project={project}
              items={this.state.imageList}
              waiting={waiting}
              onChange={this.onChange}
              updatePosition={this.updatePosition}
              onRadioClick={this.onRadioClick}
              onCheckboxClick={this.onCheckboxClick}
              onHalfSizeClick={this.onHalfSizeClick}
              onClickDelete={this.onClickDelete}
              onSortEnd={this.onSortEnd}
            />
          </div>
        )}
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
  {
    deleteImage,
    setGridPosition,
    setBackgroundImage,
    setImageVisibility,
    setImageHalfSize
  }
)(ImageList)
