import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectById } from '../../../../actions/projectActions'

import Spinner from '../../common/Spinner'

import cx from 'classnames'
import styles from './Project.module.sass'
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      scrollDistance: 0,
      titlePosition: 16,
      titleColor: 255,
      fixed: true
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  listenScrollEvent = e => {
    let scrollDistance
    if (window.scrollY > 100) {
      scrollDistance = (window.scrollY - 100) / 500
      console.log(scrollDistance)
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
    if (window.scrollY > window.innerHeight - 20) {
      this.setState({
        titlePosition: window.innerHeight - window.scrollY + 16 - 20
      })
    } else {
      this.setState({ titlePosition: 16 })
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
              src={`/public/${project._id}/${image.originalName}`}
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
          <div className={styles['placeholder']}>hallo</div>
          <div
            className={cx(styles['project-info'], {
              [styles.fixed]: this.state.fixed
            })}
            style={{
              top: this.state.titlePosition,
              color: `rgb(
                ${this.state.titleColor},
                ${this.state.titleColor},
                ${this.state.titleColor}
              )`
            }}
          >
            <h1 className={styles['project-title']}>{project.name}</h1>
            <div className={styles['project-location']}>Wien Simmering</div>
          </div>
          <div className={styles['project-content']}>
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
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getProjectById }
)(Project)
