import axios from 'axios'
import {
  CREATE_PROJECT,
  GET_PROJECTS,
  PROJECT_LOADING,
  SET_WAITING,
  CLEAR_PROJECTS,
  CLEAR_CURRENT_PROJECT,
  GET_ERRORS,
  GET_PROJECTS_AFTER_TEN,
  GET_GRID_TOPTEN,
  GET_PROJECT
} from './types'

// Create project
export const createProject = name => dispatch => {
  dispatch(setWaiting())
  const data = {
    name: name
  }
  axios.post('/api/projects', data).then(res => {
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data
    })
  })
}

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

export const getProjectsAfterTen = () => dispatch => {
  axios
    .get('/api/projects/get_projects_after_ten')
    .then(res => {
      dispatch({
        type: GET_PROJECTS_AFTER_TEN,
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

export const getGridTopTen = () => dispatch => {
  axios
    .get('/api/projects/get_project_grid')
    .then(res => {
      dispatch({
        type: GET_GRID_TOPTEN,
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
// Clear current project
export const clearCurrentProject = () => {
  console.log('clear project')
  return {
    type: CLEAR_CURRENT_PROJECT
  }
}

export const setWaiting = () => {
  return {
    type: SET_WAITING
  }
}
