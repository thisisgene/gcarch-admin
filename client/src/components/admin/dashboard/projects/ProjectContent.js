import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectById } from '../../../../actions/projectActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'

import Spinner from '../../common/Spinner'
import ImageUpload from '../ImageUpload'
import ImageList from '../ImageList'

class ProjectContent extends Component {
  constructor(props) {
    super()
    this.state = {
      description: '',
      project: {},
      errors: {}
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
  }

  // FIXME: Input onChange and value .. use redux-form !?

  render() {
    // const { user } = this.props.auth
    const { project, loading } = this.props.project

    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      projectContent = (
        <div className="project-content-container">
          <div className="project-text">
            <div className="project-text--title">
              <TextFieldGroup
                name="title"
                value={project.title}
                onChange={this.onChange}
              />
            </div>
            <div className="project-text--description">
              <TextareaFieldGroup
                name="description"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="project-images">
            <ImageUpload project={this.props.project.project} />
            <ImageList project={this.props.project} />
          </div>
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    return <div className="project-content container">{projectContent}</div>
  }
}

ProjectContent.propTypes = {
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
)(ProjectContent)
