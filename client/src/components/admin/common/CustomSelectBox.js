import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllProjects } from '../../../actions/projectActions'

class CustomSelectBox extends Component {
  state = {
    projects: [],
    loading: true
  }

  componentDidMount() {
    this.props.getAllProjects()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.project != this.props.project &&
      this.props.project.projects != null
    ) {
      this.setState({
        projects: this.props.project.projects,
        loading: false
      })
    }
  }

  onChange = e => {
    this.props.selectProject(e.target.value)
  }

  render() {
    const { loading, projects } = this.state
    return (
      <div>
        {!loading ? (
          <div>
            <select
              value={this.props.selected}
              onChange={this.onChange}
              name="projectSelect"
              id=""
            >
              <option value="">---</option>
              {projects.map((project, index) => (
                <option value={project._id} key={index}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(
  mapStateToProps,
  { getAllProjects }
)(CustomSelectBox)
