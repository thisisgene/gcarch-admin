import axios from 'axios'
import {
  GET_NEWS,
  PROJECT_LOADING,
  CLEAR_PROJECTS,
  GET_ERRORS,
  GET_NEWS_BY_ID,
  CREATE_NEWS,
  DELETE_NEWS,
  UPDATE_NEWS
} from './types'

// Get all projects
export const getAllNews = () => dispatch => {
  // dispatch(setNewsLoading())
  axios
    .get('/api/news')
    .then(res => {
      dispatch({
        type: GET_NEWS,
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

// Create News
export const createNews = title => dispatch => {
  // dispatch(setWaiting())
  const data = {
    title: title
  }
  axios
    .post('/api/news', data)
    .then(res => {
      dispatch({
        type: CREATE_NEWS,
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

// Update News
export const updateNews = data => dispatch => {
  axios
    .post(`/api/news/update`, data)
    .then(res =>
      dispatch({
        type: UPDATE_NEWS,
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

// delete news
export const deleteNews = id => dispatch => {
  axios
    .get(`/api/news/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_NEWS,
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

// Get project by ID
export const getNewsById = id => dispatch => {
  // dispatch(setNewsLoading())
  console.log('action! ', id)
  axios
    .get('/api/news/id/' + id)
    .then(res =>
      dispatch({
        type: GET_NEWS_BY_ID,
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

// News loading
// export const setNewsLoading = () => {
//   return {
//     type: NEWS_LOADING
//   }
// }
// Clear projects
export const clearProjects = () => {
  return {
    type: CLEAR_PROJECTS
  }
}
