import axios from 'axios'
import { SET_WAITING, GET_ERRORS, UPLOAD_IMAGES, DELETE_IMAGE } from './types'

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

export const setWaiting = () => {
  return {
    type: SET_WAITING
  }
}
