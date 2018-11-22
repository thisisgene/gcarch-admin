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
import { getGridTopTen } from '../../../../actions/imageActions'

// import './projects.css'
class Projects extends Component {
  componentDidMount() {
    this.props.getAllProjects()
    this.props.getGridTopTen()
  }
  render() {
    const { projects, topten } = this.props.project
    let projectContent

    if (projects === null || topten === undefined) {
      projectContent = <Spinner />
    } else {
      if (projects.noprojects || topten.length === 0) {
        projectContent = (
          <div>
            <p>{projects.noprojects}</p>
          </div>
        )
      } else {
        let projectList = []
        for (let i = 0; i < topten.length; i++) {
          console.log(i, topten[i].position)
          if (
            topten[i].isTaken &&
            topten[i].position != null &&
            topten[i].position !== '-'
          ) {
            console.log(topten[i].isTaken, topten[i].projectName)
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
                    pathname: '/user/projekte/' + topten[i].projectId
                  }}
                  params={{ id: topten[i].projectId }}
                  activeClassName="active"
                  onClick={() => this.props.getProjectById(topten[i].projectId)}
                >
                  <ProjectPreview
                    project={topten[i]}
                    position={topten[i].position}
                  />
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
  getGridTopTen: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  topten: PropTypes.object
}

const mapStateToProps = state => ({
  project: state.project,
  topten: state.topten,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllProjects, getProjectById, getGridTopTen }
)(Projects)

// export default Projects
