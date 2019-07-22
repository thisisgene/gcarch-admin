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

  onVisibilityClick(projectId, e) {
    this.props.updateProject(projectId, e.target.checked, 'isVisible')
  }
  onFontColorClick(projectId, key, e) {
    // console.log(key)
    this.props.updateProject(projectId, e.target.checked, key)
    // console.log(projectId)
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
            onClick={this.onVisibilityClick.bind(this, project._id)}
            onChange={this.onChange}
            defaultChecked={project.isVisible}
          />
          <label htmlFor="isVisible">
            <i className="fa fa-eye" />
          </label>
        </div>
        <div className={styles['sidebar-p-fontcolor']}>
          <input
            id="fontColor"
            name="fontColor"
            type="checkbox"
            className={globalStyles['form-control']}
            onClick={this.onFontColorClick.bind(
              this,
              project._id,
              'fontColorBlack'
            )}
            onChange={this.onChange}
            defaultChecked={project.fontColorBlack}
          />
          <label htmlFor="fontColor">
            Schrift schwarz (desktop)
            {/* <i className="fa fa-eye" /> */}
          </label>
          <input
            id="fontColorMobile"
            name="fontColorMobile"
            type="checkbox"
            className={globalStyles['form-control']}
            onClick={this.onFontColorClick.bind(
              this,
              project._id,
              'fontColorBlackMobile'
            )}
            onChange={this.onChange}
            defaultChecked={project.fontColorBlackMobile}
          />
          <label htmlFor="fontColorMobile">
            Schrift schwarz (mobil)
            {/* <i className="fa fa-eye" /> */}
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
