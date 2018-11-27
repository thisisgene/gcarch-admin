import axios from 'axios'
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  UPDATE_PROJECT_CONTENT,
  GET_PROJECTS,
  PROJECT_LOADING,
  SET_WAITING,
  SET_DYNAMIC_SAVE,
  CLEAR_PROJECTS,
  CLEAR_CURRENT_PROJECT,
  GET_ERRORS,
  GET_PROJECTS_AFTER_TEN,
  GET_GRID_TOPTEN,
  GET_PROJECT,
  SET_HOME_PROJECT
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

export const updateProject = (id, content, type) => dispatch => {
  dispatch(setWaiting())
  const data = {
    id: id
  }
  data[type] = content
  axios.post('/api/projects/update', data).then(res => {
    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data
    })
  })
}

export const updateProjectContent = (description, id) => dispatch => {
  dispatch(setDynamicSave())
  const data = {
    id: id,
    descriptionMarkdown: description
  }
  axios.post('/api/projects/update', data).then(res => {
    dispatch({
      type: UPDATE_PROJECT_CONTENT,
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

// SET HOME PROJECT
export const setHomeProject = id => dispatch => {
  dispatch(setWaiting())
  axios
    .get(`/api/projects/set_home_project/${id}`)
    .then(res =>
      dispatch({
        type: SET_HOME_PROJECT,
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
// Clear current project
export const clearCurrentProject = () => {
  return {
    type: CLEAR_CURRENT_PROJECT
  }
}

export const setWaiting = () => {
  return {
    type: SET_WAITING
  }
}
export const setDynamicSave = () => {
  return {
    type: SET_DYNAMIC_SAVE
  }
}
