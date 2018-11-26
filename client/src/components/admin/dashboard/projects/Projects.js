import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import ProjectList from './ProjectList'
import ProjectContent from './ProjectContent'
import ProjectLayoutCheatsheet from './ProjectLayoutCheatsheet'

import {
  getAllProjects,
  getProjectById
} from '../../../../actions/projectActions'

import styles from './Projects.module.sass'

// TODO: If single project (props.project.project) exists -> Redirect to project view.
class Projects extends Component {
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <div className={styles['projects']}>
        <ProjectList />
        <Route
          path="/admin/projects/:id"
          props={this.props}
          description={this.props.description}
          component={ProjectContent}
        />
        <ProjectLayoutCheatsheet />
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
