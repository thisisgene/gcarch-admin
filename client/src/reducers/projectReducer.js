import {
  GET_PROJECTS,
  PROJECT_LOADING,
  SET_WAITING,
  GET_PROJECT,
  CLEAR_PROJECTS,
  UPLOAD_IMAGES,
  DELETE_IMAGE
} from '../actions/types'

const initialState = {
  project: null,
  projects: null,
  loading: false,
  waiting: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECT_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_WAITING:
      return {
        ...state,
        waiting: true
      }
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false
      }
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false
      }
    case CLEAR_PROJECTS:
      return {
        ...state,
        project: null,
        projects: null
      }
    case UPLOAD_IMAGES:
      return {
        ...state,
        project: action.payload,
        loading: false
      }
    case DELETE_IMAGE:
      console.log(action.payload)
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    default:
      return state
  }
}
