import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import projectReducer from './projectReducer'
import newsReducer from './newsReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  project: projectReducer,
  news: newsReducer
})
