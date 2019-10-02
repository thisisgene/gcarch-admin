import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import arrayMove from 'array-move'

import {
  getAllProjects,
  getProjectById,
  createProject,
  setHomeProject,
  sortProjects,
  deleteProject
} from '../../../../actions/projectActions'

import TextInputButtonGroup from '../../common/TextInputButtonGroup'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import styles from './Projects.module.sass'
import Spinner from '../../common/Spinner'

let projectList = []
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'rgba(255, 255, 255, .1)' : 'transparent'
})

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#C1FEE9' : 'transparent',
  ...draggableStyle
})

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectList: [],
      listLoading: true,
      name: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getAllProjects()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.project != this.props.project &&
      this.props.project.projects != prevProps.project.projects
    ) {
      this.setState({
        projectList: this.props.project.projects,
        listLoading: false
      })
    }
  }

  // Drag and Drop logic
  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    // arrayMove(list, oldIndex, newIndex)
    const orderObj = arrayMove(
      this.state.projectList,
      result.source.index,
      result.destination.index
    )
    this.props.sortProjects(orderObj)
    this.setState({ projectList: orderObj })
  }

  // Other logic

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
    const { errors } = this.state
    const projects = this.state.projectList
    let projectListContent
    // let projectContent

    if (projects === null) {
      projectListContent = <p>Noch keine Projekte.</p>
    } else {
      if (this.state.listLoading) {
        projectListContent = (
          <div>
            <Spinner></Spinner>
          </div>
        )
      }
    }

    return (
      <div className={cx(styles['project-list'], globalStyles.container)}>
        <div className={globalStyles['row']}>
          <div className={globalStyles['col-md-12']}>
            <TextInputButtonGroup
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Neues Projekt"
              onChange={this.onChange}
              onClick={this.onClick}
              error={errors.name}
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
              <div className={styles['list-container']}>
                {!this.state.listLoading && (
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <ul
                          className={styles['table-body']}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {projects.map((project, i) => (
                            <Draggable
                              key={i}
                              draggableId={`item-${i}`}
                              index={i}
                            >
                              {(provided, snapshot) => (
                                <li
                                  className={cx(styles['list-item'], {
                                    [styles['semi-opaque']]: !project.isVisible
                                  })}
                                  key={i}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <div className={cx(styles['list-child'])}>
                                    <button
                                      className={cx(
                                        globalStyles['btn'],
                                        globalStyles['btn-link']
                                      )}
                                      onClick={this.onClickDelete.bind(
                                        this,
                                        project._id
                                      )}
                                    >
                                      <i className="fa fa-minus-circle" />
                                    </button>
                                  </div>
                                  <div className={styles['list-child']}>
                                    <input
                                      type="radio"
                                      name={`optHomepage`}
                                      onClick={this.onRadioClick.bind(
                                        this,
                                        project._id
                                      )}
                                      defaultChecked={project.isHomePage}
                                    />
                                  </div>
                                  <div className={styles['list-child']}>
                                    <NavLink
                                      to={{
                                        pathname:
                                          '/admin/projects/' + project._id
                                      }}
                                      params={{ id: project._id }}
                                      activeClassName={styles['active']}
                                      onClick={() =>
                                        this.props.getProjectById(project._id)
                                      }
                                    >
                                      {project.name}
                                    </NavLink>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          ))}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </div>
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
  sortProjects: PropTypes.func.isRequired,
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
      sortProjects,
      deleteProject
    }
  )(ProjectList)
)
