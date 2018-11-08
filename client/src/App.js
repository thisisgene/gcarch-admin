import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import { logoutUser } from './actions/authActions'
import { clearProjects } from './actions/projectActions'

import { Provider } from 'react-redux'
import store from './store'

import NotFound from './components/NotFound'
import User from './components/user/User'
import Admin from './components/admin/Admin'

import './App.css'
import './components/admin/common/common.css'
import './components/admin/dashboard/Dashboard.css'

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Dedode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Clear current Project
    store.dispatch(clearProjects())
    // Redirect to login
    window.location.href = 'admin/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={NotFound} />
            <div className="User">
              <Route exact path="/user" component={User} />
            </div>
            <div className="Admin">
              <Route path="/admin/" component={Admin} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
