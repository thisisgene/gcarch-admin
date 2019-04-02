import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import newsReducer from './newsReducer'
import teamReducer from './teamReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  project: projectReducer,
  news: newsReducer,
  team: teamReducer
})
