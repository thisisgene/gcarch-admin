import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'

import Spinner from '../../common/Spinner'

import {
  getAllProjects,
  getProjectById
} from '../../../../actions/projectActions'

// import './projects.css'
class Projects extends Component {
  componentDidMount() {
    this.props.getAllProjects()
  }
  render() {
    const { projects } = this.props.project
    let projectContent

    if (projects === null) {
      projectContent = <Spinner />
    } else {
      if (projects.noprojects) {
        projectContent = (
          <div>
            <p>{projects.noprojects}</p>
          </div>
        )
      } else {
        let projectList = []
        for (let i = 0; i < projects.length; i++) {
          if (!projects[i].isDeleted) {
            projectList.push(
              <li
                key={i}
                //
              >
                <NavLink
                  to={{
                    pathname: '/user/projects/' + projects[i]._id
                  }}
                  params={{ id: projects[i]._id }}
                  activeClassName="active"
                  onClick={() => this.props.getProjectById(projects[i]._id)}
                >
                  {projects[i].name}
                </NavLink>
              </li>
            )
          }
        }
        projectContent = (
          <div>
            <ul>{projectList}</ul>
          </div>
        )
      }
    }

    return <div className="projects">{projectContent}</div>
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
