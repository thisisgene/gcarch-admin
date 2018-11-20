import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Spinner from '../../common/Spinner'
import ProjectPreview from './ProjectPreview'

import cx from 'classnames'
import styles from './Project.module.sass'
import gridStyles from './ProjectGrid.module.sass'

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
              <div
                className={cx(
                  gridStyles['grid-item'],
                  gridStyles[`grid-item--${i}`]
                )}
                key={i}
                //
              >
                <NavLink
                  to={{
                    pathname: '/user/projekte/' + projects[i]._id
                  }}
                  params={{ id: projects[i]._id }}
                  activeClassName="active"
                  onClick={() => this.props.getProjectById(projects[i]._id)}
                >
                  <ProjectPreview project={projects[i]} position={i} />
                </NavLink>
              </div>
            )
          }
        }
        projectContent = (
          <div>
            <div className={gridStyles['grid']}>{projectList}</div>
          </div>
        )
      }
    }

    return (
      <div className={styles.projects}>
        <div className={styles['project-grid']}>{projectContent}</div>
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
