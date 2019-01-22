import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getProjectById,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import ArrowDown from '../../common/img/arrow_down.png'
import Spinner from '../../common/Spinner'

import cx from 'classnames'
import styles from './Project.module.sass'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      scrollDistance: 0,
      titlePosition: 0,
      offset: 20,
      titleColor: 255,
      fixed: true,
      mobile: false
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
    this.props.hasBackgroundImage(true)
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      this.setState({
        mobile: true,
        offset: 84
      })
    }
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  listenScrollEvent = e => {
    let scrollDistance
    if (window.scrollY > 100) {
      scrollDistance = (window.scrollY - 100) / 500
      this.setState({
        scrollDistance,
        titleColor: 255 - scrollDistance * 200
      })
    } else {
      this.setState({
        scrollDistance: 0,
        titleColor: 255
      })
    }
    if (window.scrollY > window.innerHeight - this.state.offset) {
      if (this.state.mobile) {
        this.setState({ fixed: false })
      } else {
        this.setState({
          titlePosition: window.innerHeight - window.scrollY - this.state.offset
        })
      }
    } else {
      this.setState({ titlePosition: 0 })
    }
  }

  render() {
    const { project, loading } = this.props.project
    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      let imageArray = []
      for (let image of project.images) {
        if (image.isVisible && !image.isDeleted) {
          imageArray.push(
            <img
              className={styles['project-img']}
              key={image._id}
              src={`/assets/gc-arch/uploads/${project._id}/${
                image.originalName
              }`}
              alt=""
            />
          )
        }
      }
      projectContent = (
        <div
          className={styles['project-content-container']}
          style={{
            background: `rgba(255, 255, 255, ${this.state.scrollDistance})`
          }}
        >
          <div className={styles['placeholder']}>platzhalter</div>
          <a href="#info" className={styles['arrow-down']}>
            <img src={ArrowDown} alt="Pfeil nach unten" />
          </a>
          <div
            className={styles['project-info']}
            style={
              this.state.mobile === false
                ? {
                    // zIndex: this.state.mobile ? -1 : 1,
                    top: this.state.titlePosition + this.state.offset,
                    color: `rgb(
                ${this.state.titleColor},
                ${this.state.titleColor},
                ${this.state.titleColor}
              )`
                  }
                : {
                    opacity: `calc(1 - ${this.state.scrollDistance} * 5)`
                  }
            }
          >
            <h1 className={styles['project-title']}>{project.name}</h1>
            <div className={styles['project-location']}>Wien Simmering</div>
          </div>
          <div id="info" className={styles['project-content']}>
            <div
              className={cx(styles['project-info'], styles['mobile-title'])}
              style={
                this.state.mobile
                  ? {
                      color: `rgba(calc(${this.state.titleColor}/1.4),
                        calc(${this.state.titleColor}/1.4),
                        calc(${this.state.titleColor}/1.4), calc(-.5 + ${
                        this.state.scrollDistance
                      } * 8))`
                    }
                  : {}
              }
            >
              <h1 className={styles['project-title']}>{project.name}</h1>
              <div className={styles['project-location']}>Wien Simmering</div>
            </div>
            <div
              className={styles['project-lead-description']}
              dangerouslySetInnerHTML={{ __html: project.leadDescriptionHtml }}
            />
            <div
              className={styles['project-description']}
              dangerouslySetInnerHTML={{ __html: project.descriptionHtml }}
            />
            <div className={styles['image-container']}>{imageArray}</div>
          </div>
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    return <div>{projectContent}</div>
  }
}

Project.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  hasBackgroundImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  // hasBackgroundImage: state.hasBackgroundImage,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getProjectById, hasBackgroundImage }
)(Project)
