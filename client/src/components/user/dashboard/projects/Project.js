import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProjectById } from '../../../../actions/projectActions'

import Spinner from '../../common/Spinner'

class Project extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getProjectById(id)
  }
  render() {
    const { project, loading } = this.props.project

    let projectContent

    if (loading) {
      projectContent = <Spinner />
    } else if (project) {
      if (project.backgroundImage) {
        console.log('background-image: ', project.backgroundImage._id)
      }
      projectContent = (
        <div className="project-content-container">
          <p>{project.name}</p>
        </div>
      )
    } else {
      projectContent = <p>Kein Projekt gewählt</p>
    }

    return <div className="project-content container">{projectContent}</div>
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
