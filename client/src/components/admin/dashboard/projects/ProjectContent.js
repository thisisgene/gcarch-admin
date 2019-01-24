import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getProjectById,
  getAllProjects,
  updateProjectContent
} from '../../../../actions/projectActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'
import TextInputButtonGroup from '../../common/TextInputButtonGroup'

import Spinner from '../../common/Spinner'
import ImageUpload from '../ImageUpload'
import ImageList from '../ImageList'
import Sidebar from './Sidebar'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

class ProjectContent extends Component {
  constructor() {
    super()
    this.state = {
      project: {},
      title: '',
      location: '',
      leadDescription: '',
      description: '',
      errors: {},
      timeout: 0,
      writing: false
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitDescription = id => {
    const content = {
      id: id,
      name: this.state.title,
      location: this.state.location,
      leadDescriptionMarkdown: this.state.leadDescription,
      descriptionMarkdown: this.state.description
    }

    this.props.updateProjectContent(content)
  }

  componentDidMount() {
    const id = this.props.match.params.id
    // this.setState({ leadDescription: '', description: '' })
    this.props.getProjectById(id)
    // const project = this.props.project.project
    // if (project) {
    //   this.setState({ description: project.descriptionMarkdown })
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.project.project) {
        const project = this.props.project.project
        this.setState({ title: project.name })
        this.setState({ location: project.location })
        this.setState({ description: project.descriptionMarkdown })
        this.setState({ leadDescription: project.leadDescriptionMarkdown })
        if (
          prevProps.project.project &&
          this.props.project.project.name !== prevProps.project.project.name
        ) {
          this.props.getAllProjects()
        }
      }
    }
  }

  render() {
    const { project, loading, dynamicSave } = this.props.project

    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      // TODO: Make project name updateable
      projectContent = (
        <div className={styles['project-content-container']}>
          <div className={styles['project-text']}>
            <div className={styles['project-text-title']}>
              <TextFieldGroup
                name="title"
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <div className={styles['project-text-location']}>
              <label htmlFor="location">Ort</label>
              <TextFieldGroup
                id="location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
              />
            </div>
            <div
              className={cx(styles['project-text-short-description'], {
                [styles['dynamic-save']]: dynamicSave
              })}
            >
              <TextareaFieldGroup
                className={dynamicSave ? styles['dynamic-save'] : ''}
                name="leadDescription"
                value={this.state.leadDescription}
                onChange={this.onChange}
                // onKeyUp={this.onKeyUp.bind(this, project._id)}
              />
            </div>
            <div
              className={cx(styles['project-text-description'], {
                [styles['dynamic-save']]: dynamicSave
              })}
            >
              <TextareaFieldGroup
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                // onKeyUp={this.onKeyUp.bind(this, project._id)}
              />
            </div>
            <div>
              <button
                className={commonStyles['submit-button']}
                onClick={this.submitDescription.bind(this, project._id)}
              >
                Speichern
              </button>
            </div>
          </div>
          <div className={styles['project-images']}>
            <ImageUpload id={project._id} category={'project'} />
            <ImageList
              project={this.props.project}
              positions={[]}
              test="test"
            />
          </div>
          <div className={styles['project-sidebar']}>
            <Sidebar project={this.props.project} />
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
  updateProjectContent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getProjectById, getAllProjects, updateProjectContent }
)(ProjectContent)
