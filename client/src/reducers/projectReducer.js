import {
  CREATE_PROJECT,
  GET_PROJECTS,
  PROJECT_LOADING,
  SET_WAITING,
  SET_DYNAMIC_SAVE,
  GET_PROJECT,
  CLEAR_PROJECTS,
  CLEAR_CURRENT_PROJECT,
  UPLOAD_IMAGES,
  DELETE_IMAGE,
  GET_PROJECTS_AFTER_TEN,
  GET_GRID_TOPTEN,
  SET_GRID_POSITION,
  SET_BACKGROUND_IMAGE,
  SET_IMAGE_VISIBILITY,
  UPDATE_PROJECT,
  UPDATE_PROJECT_CONTENT,
  SET_HOME_PROJECT,
  SET_USER_BACKGROUND,
  DELETE_PROJECT,
  SORT_PROJECTS
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
    case SET_DYNAMIC_SAVE:
      return {
        ...state,
        dynamicSave: true
      }
    case CREATE_PROJECT:
      return {
        ...state,
        projects: action.payload,
        description: action.payload.descriptionMarkdown,
        waiting: false
      }
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
        waiting: false
      }
    case UPDATE_PROJECT_CONTENT:
      return {
        ...state,
        project: action.payload,
        waiting: false
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
        description: action.payload.descriptionMarkdown,
        loading: false
      }
    case SET_HOME_PROJECT:
      return {
        ...state,
        projects: action.payload,
        waiting: false
      }
    case CLEAR_PROJECTS:
      return {
        ...state,
        project: null,
        projects: null
      }
    case CLEAR_CURRENT_PROJECT:
      return {
        ...state,
        project: null
      }
    case SORT_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: action.payload
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
    case SET_USER_BACKGROUND:
      return {
        ...state,
        background: action.payload
      }
    default:
      return state
  }
}
