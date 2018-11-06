import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectById } from '../../../actions/projectActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'

import Spinner from '../../common/Spinner'
import ImageUpload from '../ImageUpload'
import ImageList from '../ImageList'

class ProjectContent extends Component {
  constructor(props) {
    // console.log(props)
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

  render() {
    // const { user } = this.props.auth
    const { project, loading } = this.props.project

    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      projectContent = (
        <div>
          <p>{project.name}</p>
          <TextFieldGroup
            name="title"
            value={project.title}
            onChange={this.onChange}
          />
          <TextareaFieldGroup
            name="description"
            value={
              project.descriptionMarkdown ? project.descriptionMarkdown : ''
            }
            onChange={this.onChange}
          />
          <ImageUpload project={this.props.project.project} />
          <ImageList project={this.props.project.project} />
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    return (
      <div className="project-list container">
        <div className="row">
          <div className="col-md-12">{projectContent}</div>
        </div>
      </div>
    )
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
