import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import axios from 'axios'

import arrayMove from 'array-move'

import { deleteImage } from '../../../actions/imageActions'
import {
  setGridPosition,
  setBackgroundImage,
  setImageVisibility
} from '../../../actions/imageActions'

import ImageListItem from './ImageListItem'

import styles from './projects/Projects.module.sass'

const SortableItem = SortableElement(({ project, img, i, waiting }) => (
  <ImageListItem key={i} project={project} img={img} i={i} waitin={waiting} />
))

const SortableList = SortableContainer(({ items, project, waiting }) => {
  return (
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
              />
            ))
        ) : (
          <p>Noch keine Einträge</p>
        )}
      </tbody>
    </table>
  )
})

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

  // onChange = (i, e) => {
  //   const target = e.target
  //   let values = [...this.state.values]
  //   const value = target.type === 'checkbox' ? target.checked : target.value
  //   values[i] = value
  //   this.setState({ values })
  // }

  // updatePosition = (projectId, projectName, imageId, imgName, i, e) => {
  //   this.props.setGridPosition(
  //     projectId,
  //     projectName,
  //     imageId,
  //     imgName,
  //     e.target.value
  //   )
  // }

  // onRadioClick = (projectId, imageId) => {
  //   this.props.setBackgroundImage(projectId, imageId)
  // }
  // onCheckboxClick = (projectId, imageId, e) => {
  //   console.log(e.target.checked)
  //   this.props.setImageVisibility(projectId, imageId, e.target.checked)
  // }

  // onClickDelete = e => {
  //   const data = e.currentTarget.dataset
  //   const imgid = data.img_id
  //   const projectid = data.project_id
  //   this.props.deleteImage(projectid, imgid, 'project')
  // }

  // getAllImages() {
  //   let imageList = []
  //   if (this.props.project.project) {
  //     const { project, waiting } = this.props.project
  //     let options = ['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  //     for (let [i, img] of project.images.entries()) {
  //       if (!img.isDeleted) {
  //         let imgSrc = `/assets/projekte/${project._id}/${img.originalName}`
  //         imageList.push()
  //       }
  //     }
  //   }
  //   return imageList
  // }

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
              items={project.images}
              waiting={waiting}
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
  { deleteImage, setGridPosition, setBackgroundImage, setImageVisibility }
)(ImageList)
