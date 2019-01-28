import {
  CREATE_NEWS,
  GET_NEWS,
  SET_WAITING,
  GET_NEWS_BY_ID,
  DELETE_PROJECT,
  DELETE_NEWS,
  DELETE_IMAGE,
  UPLOAD_IMAGES,
  NEWS_SAVING,
  UPDATE_NEWS
} from '../actions/types'

const initialState = {
  news: null,
  newsItem: null,
  loading: false,
  waiting: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEWS:
      return {
        ...state,
        news: action.payload,
        description: action.payload.descriptionMarkdown,
        waiting: false
      }

    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
        loading: false
      }

    case GET_NEWS_BY_ID:
      return {
        ...state,
        newsItem: action.payload,
        loading: false
      }
    case DELETE_NEWS:
      return {
        ...state,
        news: action.payload
      }
    case UPLOAD_IMAGES:
      return {
        ...state,
        newsItem: action.payload,
        loading: false
      }
    case DELETE_IMAGE:
      return {
        ...state,
        newsItem: action.payload,
        waiting: false
      }
    case NEWS_SAVING:
      return {
        ...state,
        saving: true
      }
    case UPDATE_NEWS:
      return {
        ...state,
        saving: false
      }
    default:
      return state
  }
}
