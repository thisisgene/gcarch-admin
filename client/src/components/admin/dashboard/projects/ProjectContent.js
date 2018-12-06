import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getProjectById,
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
import styles from './Projects.module.sass'

class ProjectContent extends Component {
  constructor() {
    super()
    this.state = {
      project: {},
      description: '',
      errors: {},
      timeout: 0
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeyUp = (id, e) => {
    this.setState({ writing: true })
    clearTimeout(this.state.timeout)
    this.setState({
      timeout: setTimeout(() => {
        this.props.updateProjectContent(this.state.description, id)
        this.setState({ writing: false })
      }, 1000)
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
  }

  componentWillReceiveProps(nextProps) {
    // FIXME: Only update once when loaded initially
    if (nextProps.project.project) {
      const project = nextProps.project.project
      this.setState({ description: project.descriptionMarkdown })
    }
  }

  onLocationClick = e => {
    console.log(e.target.value)
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
                value={project.name}
                onChange={this.onChange}
              />
            </div>
            <div className={styles['project-text-location']}>
              <label htmlFor="location">Ort</label>
              <TextInputButtonGroup
                type="text"
                id="location"
                name="location"
                value={project.location}
                onChange={this.onChange}
                onClick={this.onLocationClick}
                buttonText="ok"
              />
            </div>
            {/* <div>
              <TextareaFieldGroup
                className={dynamicSave ? styles['dynamic-save'] : ''}
                name="leadDescription"
                value={this.state.description}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp.bind(this, project._id)}
              />
            </div> */}
            <div className={styles['project-text-description']}>
              <TextareaFieldGroup
                className={dynamicSave ? styles['dynamic-save'] : ''}
                name="blockDescription"
                value={this.state.description}
                onChange={this.onChange}
                onKeyUp={this.onKeyUp.bind(this, project._id)}
              />
            </div>
          </div>
          <div className={styles['project-images']}>
            <ImageUpload project={project} />
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
  { getProjectById, updateProjectContent }
)(ProjectContent)
