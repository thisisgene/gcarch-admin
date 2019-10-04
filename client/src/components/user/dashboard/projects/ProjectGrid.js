import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Spinner from '../../common/Spinner'
import ProjectPreview from './ProjectPreview'

import store from '../../../../store'

import cx from 'classnames'
import styles from './Project.module.sass'
import gridStyles from './ProjectGrid.module.sass'

import {
  getAllProjects,
  getProjectsAfterTen,
  getProjectById,
  getGridTopTen,
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'
import { rankOptions } from '../../../config/config'

// if (this.props.project.project) {

// import './projects.css'
class ProjectGrid extends Component {
  state = {
    projects: [],
    isIE11: false
  }
  componentDidMount() {
    if (!!window.MSInputMethodContext && !!document.documentMode) {
      this.setState({ isIE11: true })
    }

    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
    this.props.getAllProjects()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project != this.props.project) {
      const project = this.props.project
      if (project.projects) this.setState({ projects: project.projects })
    }
  }

  render() {
    const { projects } = this.props.project
    let topRankCount = 0
    projects &&
      projects
        .filter(project => project.topTenOnGrid)
        .map(project => {
          project.images.map(image => {
            image.gridPosition &&
              image.isDeleted === false &&
              image.gridPosition !== '-' &&
              image.gridPosition !== null &&
              topRankCount++
          })
        })

    return (
      <div className={styles.projects}>
        <div className={cx(styles['project-grid'])}>
          <div className={styles['grid-container']}>
            <div
              className={cx(gridStyles['grid'], {
                [gridStyles['ie11']]: this.state.isIE11
              })}
            >
              {projects &&
                projects
                  .filter(project => project.topTenOnGrid)
                  .map(project => (
                    <>
                      {project.images &&
                        project.images
                          .filter(
                            image =>
                              image.gridPosition &&
                              image.isDeleted === false &&
                              image.gridPosition !== '-' &&
                              image.gridPosition !== null
                          )
                          .map(image => (
                            <div
                              index={image.gridPosition}
                              className={cx(
                                gridStyles['grid-item'],
                                gridStyles[`grid-item--${image.gridPosition}`]
                              )}
                              style={{ order: image.gridPosition }}
                              key={image.gridPosition}
                            >
                              <NavLink
                                to={{
                                  pathname: '/projekte/' + project._id
                                }}
                                params={{ id: project._id }}
                                activeClassName="active"
                                onClick={() =>
                                  this.props.getProjectById(project._id)
                                }
                              >
                                <ProjectPreview
                                  project={project}
                                  image={image}
                                  position={image.gridPosition}
                                  isIE11={this.state.isIE11}
                                />
                              </NavLink>
                            </div>
                          ))}
                    </>
                  ))}
              {projects &&
                projects
                  .filter(project => !project.topTenOnGrid)
                  .map((project, pIndex) => (
                    <>
                      {project.images &&
                        project.images
                          .filter(image => image.isDeleted === false)
                          .map((image, index) => (
                            <>
                              {index === 0 && (
                                <div
                                  index={topRankCount + pIndex + 1}
                                  className={cx(
                                    gridStyles['grid-item'],
                                    gridStyles[
                                      `grid-item--${topRankCount + pIndex + 1}`
                                    ]
                                  )}
                                  style={{
                                    order: topRankCount + pIndex + 1
                                  }}
                                  key={topRankCount + pIndex + 1}
                                >
                                  <NavLink
                                    to={{
                                      pathname: '/projekte/' + project._id
                                    }}
                                    params={{ id: project._id }}
                                    activeClassName="active"
                                    onClick={() =>
                                      this.props.getProjectById(project._id)
                                    }
                                  >
                                    <ProjectPreview
                                      project={project}
                                      image={image}
                                      position={image.gridPosition}
                                      isIE11={this.state.isIE11}
                                    />
                                  </NavLink>
                                </div>
                              )}
                            </>
                          ))}
                    </>
                  ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectGrid.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectsAfterTen: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  getGridTopTen: PropTypes.func.isRequired,
  hasBackgroundImage: PropTypes.func.isRequired,
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
  {
    getAllProjects,
    getProjectsAfterTen,
    getProjectById,
    getGridTopTen,
    hasBackgroundImage
  }
)(ProjectGrid)
