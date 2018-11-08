import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'
import { logoutUser } from './actions/authActions'
import { clearProjects } from './actions/projectActions'

import { Provider } from 'react-redux'
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Settings from './components/auth/Settings'
import CategoryNav from './components/dashboard/CategoryNav'
import Projects from './components/dashboard/projects/Projects'
// import News from './components/dashboard/news/News'

import './App.css'
import './components/common/common.css'
import './components/dashboard/Dashboard.css'

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
    // Clear current Profile
    store.dispatch(clearProjects())
    // Redirect to login
    window.location.href = 'login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {/* <Route exact path="/" component={Landing} /> */}

            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/settings" component={Settings} />

            <div className="dashboard">
              <PrivateRoute path="/" component={CategoryNav} />
              <div className="dashboard-content">
                <PrivateRoute path="/projects" component={Projects} />
                {/* <PrivateRoute path="/news" component={News} /> */}
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
