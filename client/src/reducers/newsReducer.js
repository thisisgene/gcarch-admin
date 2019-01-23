import {
  CREATE_NEWS,
  GET_NEWS,
  SET_WAITING,
  GET_NEWS_BY_ID
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
        description: action.payload.descriptionMarkdown,
        loading: false
      }

    default:
      return state
  }
}
