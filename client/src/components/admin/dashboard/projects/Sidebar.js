import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

import { updateProject } from '../../../../actions/projectActions'

class Sidebar extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     isVisible:
  //   }
  // }

  componentDidMount() {}
  onChange = e => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  onCheckboxClick(projectId, e) {
    this.props.updateProject(projectId, e.target.checked, 'isVisible')
  }

  render() {
    const { project, waiting } = this.props.project

    return (
      <div>
        <input
          name="isVisible"
          type="checkbox"
          className={globalStyles['form-control']}
          onClick={this.onCheckboxClick.bind(this, project._id)}
          onChange={this.onChange}
          defaultChecked={project.isVisible}
        />
        <span>Wird angezeigt</span>
      </div>
    )
  }
}

Sidebar.propTypes = {
  updateProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { updateProject }
)(Sidebar)
