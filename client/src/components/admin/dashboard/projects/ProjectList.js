import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {
  getAllProjects,
  getProjectById
} from '../../../../actions/projectActions'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllProjects()
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
            <select
              className={cx(
                globalStyles['custom-select'],
                commonStyles['custom-select'],
                commonStyles['dark-input']
              )}
            >
              <option value="1">Training</option>
              <option value="2">Paining</option>
            </select>
            <div
              className={cx(
                globalStyles['input-group'],
                commonStyles['dark-group']
              )}
            >
              <input
                type="text"
                className={cx(
                  globalStyles['form-control'],
                  commonStyles['dark-input']
                )}
                placeholder="Neues Projekt"
              />
              <div
                className={cx(
                  globalStyles['input-group-append'],
                  commonStyles['dark-append']
                )}
              >
                <button
                  className={cx(
                    globalStyles['btn'],
                    globalStyles['btn-outline-secondary']
                  )}
                  type="button"
                  onClick={this.addProject}
                >
                  <i className="fa fa-plus-circle" />
                </button>
              </div>
            </div>
            {projectListContent}
          </div>
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
