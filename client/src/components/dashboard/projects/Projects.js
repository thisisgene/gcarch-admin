import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import ProjectList from './ProjectList'
import ProjectContent from './ProjectContent'
import { getAllProjects, getProjectById } from '../../../actions/projectActions'

import './projects.css'

class Projects extends Component {
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <div className="projects">
        <ProjectList />
        <Route
          path="/projects/:id"
          props={this.props}
          component={ProjectContent}
        />
        {/* <ProjectContent props={this.props} /> */}
      </div>
    )
  }
}

Projects.propTypes = {
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
)(Projects)

// export default Projects
