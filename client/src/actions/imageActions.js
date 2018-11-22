import axios from 'axios'
import {
  SET_WAITING,
  GET_ERRORS,
  UPLOAD_IMAGES,
  DELETE_IMAGE,
  SET_GRID_POSITION
} from './types'

export const uploadImages = (files, id, category) => dispatch => {
  switch (category) {
    case 'project':
      files.map(file => {
        let formData = new FormData()
        console.log(file.size)
        formData.append('file', file)
        formData.append('name', file.name)
        formData.append('size', file.size)
        formData.append('id', id)
        return axios
          .post('/api/projects/image_upload', formData)
          .then(res => {
            dispatch({
              type: UPLOAD_IMAGES,
              payload: res.data
            })
          })
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: {}
            })
          )
      })

      break
    default:
      return null
  }
}

export const deleteImage = (projectid, imgid) => dispatch => {
  dispatch(setWaiting())
  axios
    .get(`/api/projects/delete_image/${projectid}/${imgid}`)
    .then(res => {
      dispatch({
        type: DELETE_IMAGE,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const setGridPosition = (
  projectId,
  projectName,
  imageId,
  imageName,
  position
) => dispatch => {
  dispatch(setWaiting())
  const data = {
    projectId: projectId,
    projectName: projectName,
    imageId: imageId,
    imageName: imageName,
    position: position
  }
  console.log(projectId)
  axios
    .post('/api/projects/set_grid_position', data)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: SET_GRID_POSITION,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const setWaiting = () => {
  return {
    type: SET_WAITING
  }
}
