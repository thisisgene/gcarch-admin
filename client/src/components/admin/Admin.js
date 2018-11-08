import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './common/PrivateRoute'

import Header from './layout/Header'
import Footer from './layout/Footer'
import Login from './auth/Login'
import Settings from './auth/Settings'
import Dashboard from './dashboard/Dashboard'

// import News from './dashboard/news/News'

import './Admin.css'

class Admin extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const authRoutes = (
      <div className="Admin">
        <Header />
        <Route exact path="/admin/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/admin/settings" component={Settings} />
          <PrivateRoute path="/admin" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    )
    const guestRoutes = (
      <div>
        <Header />
        <div className="dashboard">
          <Login />
        </div>
        <Footer />
      </div>
    )
    return <div>{isAuthenticated ? authRoutes : guestRoutes}</div>
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  {}
)(Admin)
