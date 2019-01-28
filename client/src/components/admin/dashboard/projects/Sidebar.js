import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateProject } from '../../../../actions/projectActions'

import ProjectLayoutCheatsheet from './ProjectLayoutCheatsheet'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

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
      <div className={styles['sidebar']}>
        <ProjectLayoutCheatsheet />
        <div className={styles['sidebar-p-visible']}>
          <input
            id="isVisible"
            name="isVisible"
            type="checkbox"
            className={globalStyles['form-control']}
            onClick={this.onCheckboxClick.bind(this, project._id)}
            onChange={this.onChange}
            defaultChecked={project.isVisible}
          />
          <label htmlFor="isVisible">
            <i className="fa fa-eye" />
          </label>
        </div>
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
