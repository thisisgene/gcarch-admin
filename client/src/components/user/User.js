import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects, getProjectById } from '../../actions/projectActions'

import Header from './layout/Header'
import Landing from './dashboard/Landing'
import Projects from './dashboard/projects/Projects'
import Project from './dashboard/projects/Project'

class User extends Component {
  render() {
    return (
      <div>
        <Header />

        <Route exact path="/user" component={Landing} />
        <Route exact path="/user/projects" component={Projects} />
        <Route
          exact
          path="/user/projects/:id"
          props={this.props}
          component={Project}
        />
      </div>
    )
  }
}

User.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllProjects, getProjectById }
)(User)
