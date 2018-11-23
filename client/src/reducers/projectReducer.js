import {
  GET_PROJECTS,
  PROJECT_LOADING,
  SET_WAITING,
  GET_PROJECT,
  CLEAR_PROJECTS,
  UPLOAD_IMAGES,
  DELETE_IMAGE,
  GET_PROJECTS_AFTER_TEN,
  GET_GRID_TOPTEN,
  SET_GRID_POSITION,
  SET_BACKGROUND_IMAGE,
  SET_IMAGE_VISIBILITY
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
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    case GET_PROJECTS_AFTER_TEN:
      return {
        ...state,
        afterTenProjects: action.payload,
        waiting: false
      }
    case GET_GRID_TOPTEN:
      return {
        ...state,
        toptenProjects: action.payload,
        waiting: false
      }
    case SET_GRID_POSITION:
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    case SET_BACKGROUND_IMAGE:
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    case SET_IMAGE_VISIBILITY:
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    default:
      return state
  }
}
