import axios from 'axios'
import {
  GET_TEAM,
  GET_TEAM_MEMBER,
  CREATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  GET_ERRORS
} from './types'

// Get all team members
export const getTeam = () => dispatch => {
  axios
    .get('/api/team')
    .then(res => {
      dispatch({
        type: GET_TEAM,
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
export const createTeamMember = title => dispatch => {
  const data = {
    title: title
  }
  axios
    .post('/api/team', data)
    .then(res => {
      dispatch({
        type: CREATE_TEAM_MEMBER,
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
// export const updateNews = data => dispatch => {
//   dispatch(setSaving())
//   axios
//     .post(`/api/news/update`, data)
//     .then(res =>
//       dispatch({
//         type: UPDATE_NEWS,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err
//       })
//     )
// }

// delete team member
export const deleteTeamMember = id => dispatch => {
  axios
    .get(`/api/team/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TEAM_MEMBER,
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

// // Get project by ID
// export const getNewsById = id => dispatch => {
//   // dispatch(setNewsLoading())
//   console.log('action! ', id)
//   axios
//     .get('/api/news/id/' + id)
//     .then(res =>
//       dispatch({
//         type: GET_NEWS_BY_ID,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err
//       })
//     )
// }

// // News saving
// export const setSaving = () => {
//   return {
//     type: NEWS_SAVING
//   }
// }

// // Clear projects
// export const clearProjects = () => {
//   return {
//     type: CLEAR_PROJECTS
//   }
// }
