import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../../../store'
import {
  clearCurrentProject,
  setUserBackground,
  hasBackgroundImage
} from '../../../actions/projectActions'

import cx from 'classnames'
import styles from './Landing.module.sass'
import { getAllProjects, getHomeProject } from '../../../actions/projectActions'

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(true)
    this.props.getHomeProject()
    // this.props.getAllProjects()
  }

  onLoad = () => {
    this.setState({
      isLoading: false
    })
  }

  render() {
    const { homeProject } = this.props.project
    let isLoading = true
    let backgroundImage
    if (homeProject != null) {
      // const homeProject = projects.filter(project => {
      //   return project.isHomePage === true
      // })

      if (homeProject && homeProject.backgroundImage) {
        isLoading = false
        let imgSrc = `/public/${homeProject._id}/${
          homeProject.backgroundImage.originalName
        }`
        backgroundImage = (
          <div>
            <div
              className={styles['background-image']}
              style={{
                backgroundImage: `url(${imgSrc})`
              }}
            />
            <img
              className={styles['fake-img']}
              src={imgSrc}
              alt=""
              onLoad={this.onLoad}
            />
          </div>
        )
      }
    }
    return (
      <div className={styles['home-page']}>
        <div
          className={cx(styles['pre-load'], {
            [styles.loading]: this.state.isLoading
          })}
        />
        {backgroundImage}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { setUserBackground, getAllProjects, getHomeProject, hasBackgroundImage }
)(Landing)
