import axios from 'axios'
import {
  GET_PROJECTS,
  PROJECT_LOADING,
  CLEAR_PROJECTS,
  GET_ERRORS,
  GET_PROJECT
} from './types'

// Get all projects
export const getAllProjects = () => dispatch => {
  dispatch(setProjectLoading())
  axios
    .get('/api/projects')
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
      // console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

// Get project by ID
export const getProjectById = id => dispatch => {
  dispatch(setProjectLoading())
  axios
    .get('/api/projects/id/' + id)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}

// Project loading
export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  }
}
// Clear projects
export const clearProjects = () => {
  return {
    type: CLEAR_PROJECTS
  }
}
