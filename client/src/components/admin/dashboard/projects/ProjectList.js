import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import {
  getAllProjects,
  getProjectById,
  createProject,
  setHomeProject,
  deleteProject
} from '../../../../actions/projectActions'

import TextInputButtonGroup from '../../common/TextInputButtonGroup'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    this.props.getAllProjects()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClick = e => {
    this.props.createProject(this.state.name)
    this.setState({ name: '' })
  }
  onRadioClick = id => {
    this.props.setHomeProject(id)
  }
  onClickDelete = id => {
    this.props.deleteProject(id)
  }
  render() {
    // const { user } = this.props.auth
    const { projects } = this.props.project
    let projectListContent
    // let projectContent

    if (projects === null) {
      projectListContent = <p>Noch keine Projekte.</p>
    } else {
      if (projects.noprojects) {
        projectListContent = (
          <div>
            <p>{projects.noprojects}</p>
          </div>
        )
      } else {
        let projectList = []
        for (let i = 0; i < projects.length; i++) {
          let project = projects[i]
          if (!project.isDeleted) {
            projectList.push(
              <tr
                key={i}
                //
              >
                <td>
                  <button
                    className={cx(
                      globalStyles['btn'],
                      globalStyles['btn-link']
                    )}
                    onClick={this.onClickDelete.bind(this, project._id)}
                    // data-img_id={img._id}
                    // data-project_id={project._id}
                  >
                    <i className="fa fa-minus-circle" />
                  </button>
                </td>
                <td>
                  <input
                    type="radio"
                    name={`optHomepage`}
                    // className={globalStyles['form-control']}
                    onClick={this.onRadioClick.bind(this, project._id)}
                    // onChange={this.onChange.bind(this, `radio_${i}`)}
                    defaultChecked={project.isHomePage}
                  />
                  {/* <input type="radio" name="opt" /> */}
                </td>
                <td>
                  <NavLink
                    to={{
                      pathname: '/admin/projects/' + project._id
                    }}
                    params={{ id: project._id }}
                    activeClassName={styles['active']}
                    onClick={() => this.props.getProjectById(project._id)}
                  >
                    {project.name}
                  </NavLink>
                </td>
              </tr>
            )
          }
        }
        projectListContent = (
          <div className={styles['table-container']}>
            <table className={styles['table-body']}>
              <thead />
              <tbody>{projectList}</tbody>
            </table>
          </div>
        )
      }
    }

    return (
      <div className={cx(styles['project-list'], globalStyles.container)}>
        <div className={globalStyles['row']}>
          <div className={globalStyles['col-md-12']}>
            {/* <select
              className={cx(
                globalStyles['custom-select'],
                commonStyles['custom-select'],
                commonStyles['dark-input']
              )}
            >
              <option value="1">Training</option>
              <option value="2">Paining</option>
            </select> */}

            <TextInputButtonGroup
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Neues Projekt"
              onChange={this.onChange}
              onClick={this.onClick}
            />
            <table>
              <thead>
                <tr>
                  <th>
                    <i className="far fa-trash-alt" />
                  </th>
                  <th>
                    <i className="fas fa-home" />
                  </th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody />
            </table>
            <div className={styles['project-list-container']}>
              {projectListContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProjectList.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  setHomeProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getAllProjects,
      getProjectById,
      createProject,
      setHomeProject,
      deleteProject
    }
  )(ProjectList)
)
