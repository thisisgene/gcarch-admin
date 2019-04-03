import {
  GET_TEAM,
  GET_TEAM_MEMBER,
  CREATE_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  UPDATE_TEAM_MEMBER,
  UPLOAD_TEAM_IMAGES,
  DELETE_TEAM_IMAGE
} from '../actions/types'

const initialState = {
  team: null,
  teamMember: null,
  loading: false,
  waiting: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TEAM_MEMBER:
      return {
        ...state,
        team: action.payload,
        waiting: false
      }

    case GET_TEAM:
      return {
        ...state,
        team: action.payload,
        loading: false
      }

    case GET_TEAM_MEMBER:
      return {
        ...state,
        teamMember: action.payload,
        loading: false
      }
    case DELETE_TEAM_MEMBER:
      return {
        ...state,
        team: action.payload
      }
    case UPLOAD_TEAM_IMAGES:
      return {
        ...state,
        teamMember: action.payload,
        loading: false
      }
    case DELETE_TEAM_IMAGE:
      return {
        ...state,
        teamMember: action.payload,
        waiting: false
      }
    // case NEWS_SAVING:
    //   return {
    //     ...state,
    //     saving: true
    //   }
    case UPDATE_TEAM_MEMBER:
      return {
        ...state,
        saving: false
      }
    default:
      return state
  }
}
