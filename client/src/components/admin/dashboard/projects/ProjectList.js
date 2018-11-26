import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {
  getAllProjects,
  getProjectById,
  createProject
} from '../../../../actions/projectActions'

import TextInputButtonGroup from '../../common/TextInputButtonGroup'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.getAllProjects()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClick = e => {
    this.props.createProject(this.state.name)
    this.setState({ name: '' })
  }

  render() {
    // const { user } = this.props.auth
    const { projects } = this.props.project
    let projectListContent
    // let projectContent

    if (projects === null) {
      projectListContent = <p>Noch keine Projekte.</p>
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
                    pathname: '/admin/projects/' + projects[i]._id
                  }}
                  params={{ id: projects[i]._id }}
                  activeClassName={styles['active']}
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
            <ul>{projectList}</ul>
          </div>
        )
      }
    }

    return (
      <div className={cx(styles['project-list'], globalStyles.container)}>
        <div className={globalStyles['row']}>
          <div className={globalStyles['col-md-12']}>
            {/* <select
              className={cx(
                globalStyles['custom-select'],
                commonStyles['custom-select'],
                commonStyles['dark-input']
              )}
            >
              <option value="1">Training</option>
              <option value="2">Paining</option>
            </select> */}

            <TextInputButtonGroup
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Neues Projekt"
              onChange={this.onChange}
              onClick={this.onClick}
            />

            <div className={styles['project-list-container']}>
              {projectListContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectList.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
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
    { getAllProjects, getProjectById, createProject }
  )(ProjectList)
)
