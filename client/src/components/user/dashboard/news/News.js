import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  getAllProjects,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import styles from './News.module.sass'

class News extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
    if (!this.props.project.projects) {
      this.props.getAllProjects()
    }
  }
  render() {
    const { projects } = this.props.project
    let projectList = []
    if (projects) {
      projectList = projects.map(project => {
        return (
          <div key={project._id} className={styles['news-item']}>
            <NavLink
              className={styles['link']}
              to={`/user/projekte/${project._id}`}
            >
              <img
                src={`/assets/gc-arch/uploads/${project._id}/${
                  project.images[0].originalName
                }`}
                alt=""
              />
              <div className={styles['news-info']}>
                <div className={styles['news-info-name']}>{project.name}</div>
                <div
                  className={styles['news-info-description']}
                  dangerouslySetInnerHTML={{
                    __html: project.leadDescriptionHtml
                  }}
                >
                  {/* Das ist unser neues Projekt. */}
                </div>
              </div>
            </NavLink>
          </div>
        )
      })
    }
    return <div className={styles['news-container']}>{projectList}</div>
  }
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(
  mapStateToProps,
  { hasBackgroundImage, getAllProjects }
)(News)
