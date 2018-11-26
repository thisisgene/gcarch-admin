import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getProjectById
  // updateProjectContent
} from '../../../../actions/projectActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'

import Spinner from '../../common/Spinner'
import ImageUpload from '../ImageUpload'
import ImageList from '../ImageList'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import styles from './Projects.module.sass'

class ProjectContent extends Component {
  constructor(props) {
    super()
    this.state = {
      description: '',
      project: {},
      errors: {},
      timeout: 0
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeyUp = e => {
    let value = e.target.value
    clearTimeout(this.state.timeout)
    this.state.timeout = setTimeout(() => {
      console.log(value)
    }, 1000)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
  }

  render() {
    // const { user } = this.props.auth
    const { project, loading } = this.props.project

    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      projectContent = (
        <div className={styles['project-content-container']}>
          <div className={styles['project-text']}>
            <div className={styles['project-text-title']}>
              <TextFieldGroup
                name="title"
                value={project.title}
                onChange={this.onChange}
              />
            </div>
            <div className={styles['project-text-description']}>
              <TextareaFieldGroup
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp}
              />
            </div>
          </div>
          <div className={styles['project-images']}>
            <ImageUpload project={this.props.project.project} />
            <ImageList
              project={this.props.project}
              positions={[]}
              test="test"
            />
          </div>
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    return (
      <div className={cx(styles['project-content'], globalStyles.container)}>
        {projectContent}
      </div>
    )
  }
}

ProjectContent.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  // updateProjectContent: PropTypes.func.isRequired,
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
)(ProjectContent)
