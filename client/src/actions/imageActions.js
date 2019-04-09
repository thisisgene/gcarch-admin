import axios from 'axios'
import {
  SET_WAITING,
  GET_ERRORS,
  UPLOAD_IMAGES,
  DELETE_IMAGE,
  SET_GRID_POSITION,
  SET_BACKGROUND_IMAGE,
  SET_IMAGE_VISIBILITY,
  DELETE_TEAM_IMAGE,
  DELETE_NEWS_IMAGE,
  UPLOAD_TEAM_IMAGES,
  UPLOAD_NEWS_IMAGES
} from './types'

export const uploadImages = (files, id, category) => dispatch => {
  switch (category) {
    case 'project':
      files.map(file => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('name', file.name)
        formData.append('size', file.size)
        formData.append('file', file)
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
    case 'news':
      files.map(file => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('name', file.name)
        formData.append('size', file.size)
        formData.append('file', file)
        return axios
          .post('/api/news/image_upload', formData)
          .then(res => {
            dispatch({
              type: UPLOAD_NEWS_IMAGES,
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
    case 'team':
      files.map(file => {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('name', file.name)
        formData.append('size', file.size)
        formData.append('file', file)
        return axios
          .post('/api/team/image_upload', formData)
          .then(res => {
            dispatch({
              type: UPLOAD_TEAM_IMAGES,
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

export const deleteImage = (id, imgid, category) => dispatch => {
  dispatch(setWaiting())
  switch (category) {
    case 'project':
      axios
        .get(`/api/projects/delete_image/${id}/${imgid}`)
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
      break
    case 'news':
      axios
        .get(`/api/news/delete_image/${id}/${imgid}`)
        .then(res => {
          dispatch({
            type: DELETE_NEWS_IMAGE,
            payload: res.data
          })
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: {}
          })
        )
      break
    case 'team':
      axios
        .get(`/api/team/delete_image/${id}/${imgid}`)
        .then(res => {
          dispatch({
            type: DELETE_TEAM_IMAGE,
            payload: res.data
          })
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: {}
          })
        )
      break
    default:
      return null
  }
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
  axios
    .post('/api/projects/set_grid_position', data)
    .then(res => {
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

export const setBackgroundImage = (projectId, imageId) => dispatch => {
  dispatch(setWaiting())
  const data = {
    projectId: projectId,
    imageId: imageId
  }
  axios
    .post('/api/projects/set_background_image', data)
    .then(res => {
      dispatch({
        type: SET_BACKGROUND_IMAGE,
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

export const setImageVisibility = (projectId, imageId, state) => dispatch => {
  dispatch(setWaiting())
  const data = {
    projectId: projectId,
    imageId: imageId,
    state: state
  }
  axios
    .post('/api/projects/set_image_visibility', data)
    .then(res => {
      dispatch({
        type: SET_IMAGE_VISIBILITY,
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

export const setImageHalfSize = (projectId, imageId, state) => dispatch => {
  dispatch(setWaiting())
  const data = {
    projectId: projectId,
    imageId: imageId,
    state: state
  }
  axios
    .post('/api/projects/set_image_half_size', data)
    .then(res => {
      dispatch({
        type: SET_IMAGE_VISIBILITY,
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
