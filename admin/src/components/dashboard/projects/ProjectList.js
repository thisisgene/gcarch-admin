import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { getAllProjects, getProjectById } from '../../../actions/projectActions'

import Spinner from '../../common/Spinner'

class ProjectList extends Component {
  componentDidMount() {
    this.props.getAllProjects()
  }

  onClick = id => {
    console.log(id)
  }

  render() {
    // const { user } = this.props.auth
    const { projects, loading } = this.props.project
    let projectListContent
    // let projectContent

    if (projects === null || loading) {
      projectListContent = <Spinner />
    } else {
      if (projects.noprojects) {
        projectListContent = (
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
                    pathname: '/projects/' + projects[i]._id
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
        projectListContent = (
          <div>
            <select className="custom-select dark-input">
              <option value="1">Training</option>
              <option value="2">Paining</option>
            </select>
            <div className="input-group dark-group">
              <input
                type="text"
                className="form-control dark-input"
                placeholder="Neues Projekt"
              />
              <div className="input-group-append dark-append">
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fa fa-plus-circle" />
                </button>
              </div>
            </div>

            <ul>{projectList}</ul>
          </div>
        )
      }
    }

    return (
      <div className="project-list container">
        <div className="row">
          <div className="col-md-12">{projectListContent}</div>
        </div>
      </div>
    )
  }
}

ProjectList.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default withRouter(
  connect(
    mapStateToProps,
    { getAllProjects, getProjectById }
  )(ProjectList)
)
