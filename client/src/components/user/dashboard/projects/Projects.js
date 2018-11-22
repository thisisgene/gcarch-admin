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
  getProjectsAfterTen,
  getProjectById,
  getGridTopTen
} from '../../../../actions/projectActions'

// import './projects.css'
class Projects extends Component {
  componentDidMount() {
    this.props.getAllProjects()
    this.props.getProjectsAfterTen()
    this.props.getGridTopTen()
  }
  render() {
    const { projects, toptenProjects, afterTenProjects } = this.props.project

    let projectContent

    if (projects === null || toptenProjects === undefined) {
      projectContent = <Spinner />
    } else {
      if (projects.noprojects || toptenProjects.length === 0) {
        projectContent = (
          <div>
            <p>{projects.noprojects}</p>
          </div>
        )
      } else {
        let projectList = []
        for (let i = 0; i < toptenProjects.length; i++) {
          if (toptenProjects[i].images.length > 0) {
            for (let image of toptenProjects[i].images) {
              if (
                image.gridPosition &&
                image.isDeleted === false &&
                image.isVisible &&
                image.gridPosition !== '-' &&
                image.gridPosition !== null
              ) {
                projectList.push(
                  <div
                    className={cx(
                      gridStyles['grid-item'],
                      gridStyles[`grid-item--${image.gridPosition}`]
                    )}
                    key={image.gridPosition}
                    //
                  >
                    <NavLink
                      to={{
                        pathname: '/user/projekte/' + toptenProjects[i]._id
                      }}
                      params={{ id: toptenProjects[i]._id }}
                      activeClassName="active"
                      onClick={() =>
                        this.props.getProjectById(toptenProjects[i]._id)
                      }
                    >
                      <ProjectPreview
                        project={toptenProjects[i]}
                        image={image}
                        position={image.gridPosition}
                      />
                    </NavLink>
                  </div>
                )
              }
            }
          }
        }
        if (afterTenProjects !== undefined && afterTenProjects.length > 0) {
          let rank = 11
          for (let i = 0; i < afterTenProjects.length; i++) {
            let project = afterTenProjects[i]
            if (project.images.length > 0) {
              let image = project.images[0]
              projectList.push(
                <div
                  className={cx(
                    gridStyles['grid-item'],
                    gridStyles[`grid-item--${rank}`]
                  )}
                  key={rank}
                  //
                >
                  <NavLink
                    to={{
                      pathname: '/user/projekte/' + project._id
                    }}
                    params={{ id: project._id }}
                    activeClassName="active"
                    onClick={() => this.props.getProjectById(project._id)}
                  >
                    <ProjectPreview
                      project={project}
                      image={image}
                      position={rank}
                    />
                  </NavLink>
                </div>
              )
              rank++
            }
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
  getProjectsAfterTen: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  getGridTopTen: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  topten: PropTypes.object
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllProjects, getProjectsAfterTen, getProjectById, getGridTopTen }
)(Projects)

// export default Projects
