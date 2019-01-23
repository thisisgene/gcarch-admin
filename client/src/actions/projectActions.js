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
  EMPTY_PROJECT,
  SORT_PROJECTS,
  DELETE_PROJECT,
  HAS_BACKGROUND_IMAGE,
  GET_HOME_PROJECT,
  SET_HOME_PROJECT,
  SET_USER_BACKGROUND
} from './types'

// Create project
export const createProject = name => dispatch => {
  dispatch(setWaiting())
  const data = {
    name: name
  }
  axios
    .post('/api/projects', data)
    .then(res => {
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
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

export const updateProjectContent = content => dispatch => {
  // dispatch(setDynamicSave())
  console.log('action', content)
  axios
    .post('/api/projects/update', content)
    .then(res => {
      dispatch({
        type: UPDATE_PROJECT_CONTENT,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
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
// Empty project prop
export const emptyProject = () => dispatch => {
  dispatch({
    type: EMPTY_PROJECT
  })
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
export const getHomeProject = id => dispatch => {
  dispatch(setWaiting())
  axios
    .get(`/api/projects/get_home_project/${id}`)
    .then(res =>
      dispatch({
        type: GET_HOME_PROJECT,
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

// Sort projects
export const sortProjects = orderObj => dispatch => {
  axios
    .post('/api/projects/sort', orderObj)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: SORT_PROJECTS,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    )
}

// delete project
export const deleteProject = id => dispatch => {
  axios
    .get(`/api/projects/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
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

// Set hasBackgroundImage to see if header should be black or white
export const hasBackgroundImage = boolean => {
  return {
    type: HAS_BACKGROUND_IMAGE,
    payload: boolean
  }
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

export const setUserBackground = (value, type) => {
  const background = {
    value: value,
    type: type
  }
  return {
    type: SET_USER_BACKGROUND,
    payload: background
  }
}
