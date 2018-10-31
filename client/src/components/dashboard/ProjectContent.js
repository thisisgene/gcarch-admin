import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectById } from '../../actions/projectActions'

import TextareaFieldGroup from '../common/TextareaFieldGroup'

import Spinner from '../common/Spinner'

class ProjectContent extends Component {
  constructor(props) {
    console.log(props)
    super()
    this.state = {
      description: '',
      errors: {}
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    const { project, loading } = nextProps.project

    if (project && project.descriptionMarkdown) {
      this.setState({ description: project.descriptionMarkdown })
    } else {
      this.setState({ description: '' })
    }
  }
  render() {
    const { user } = this.props.auth
    const { project, loading } = this.props.project

    let projectContent
    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      projectContent = (
        <div>
          <p>{project.name}</p>
          <TextareaFieldGroup
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    // if (projects === null || loading) {
    //   projectListContent = <Spinner />
    // } else {
    //   if (projects.noprojects) {
    //     projectListContent = (
    //       <div>
    //         <p>{projects.noprojects}</p>
    //       </div>
    //     )
    //   } else {
    //     let projectList = []
    //     for (let i = 0; i < projects.length; i++) {
    //       if (!projects[i].isDeleted) {
    //         projectList.push(
    //           <li key={i}>
    //             <Link to="/project" params={{ id: projects[i]._id }} />
    //             {projects[i].name}
    //           </li>
    //         )
    //       }
    //     }
    //     projectListContent = (
    //       <div>
    //         <p>Projekte:</p>
    //         <ul>{projectList}</ul>
    //       </div>
    //     )
    //   }
    // }

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
