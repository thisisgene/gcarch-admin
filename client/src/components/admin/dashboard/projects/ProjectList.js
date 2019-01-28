import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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

const grid = 12
let projectList = []
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'rgba(255, 255, 255, .1)' : 'transparent'
})

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#C1FEE9' : 'transparent',
  ...draggableStyle
})

const generateOrderObject = list => {
  const dataObj = {}
  list.forEach((project, i) => {
    dataObj['position' + project._id] = i
  })
  return dataObj
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return generateOrderObject(result)
}

class ProjectList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectList: [],
      name: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getAllProjects()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.project.project &&
      prevProps.project.project != this.props.project.project
    ) {
      console.log(this.props.project.project.isVisible)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors)
      this.setState({ errors: nextProps.errors })
    }
  }
  // Drag and Drop logic
  onBeforeDragStart = () => {
    /*...*/
  }

  onDragStart = () => {
    /*...*/
  }
  onDragUpdate = () => {
    /*...*/
  }
  onDragEnd = result => {
    if (!result.destination) {
      return
    }

    const orderObj = reorder(
      this.props.project.projects,
      result.source.index,
      result.destination.index
    )
    this.props.sortProjects(orderObj)
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
        projectList = []
        for (let i = 0; i < projects.length; i++) {
          let project = projects[i]
          if (!project.isDeleted) {
            projectList.push(
              <Draggable key={i} draggableId={`item-${i}`} index={i}>
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
                        onClick={this.onClickDelete.bind(this, project._id)}
                        // data-img_id={img._id}
                        // data-project_id={project._id}
                      >
                        <i className="fa fa-minus-circle" />
                      </button>
                    </div>
                    <div className={styles['list-child']}>
                      <input
                        type="radio"
                        name={`optHomepage`}
                        // className={globalStyles['form-control']}
                        onClick={this.onRadioClick.bind(this, project._id)}
                        // onChange={this.onChange.bind(this, `radio_${i}`)}
                        defaultChecked={project.isHomePage}
                      />
                      {/* <input type="radio" name="opt" /> */}
                    </div>
                    <div className={styles['list-child']}>
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
                    </div>
                  </li>
                )}
              </Draggable>
            )
          }
        }
        // if (this.state.projectList == '') {
        //   this.setState({ projectList: projectList })
        // }
        projectListContent = (
          <div className={styles['list-container']}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <ul
                    className={styles['table-body']}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {projectList}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
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
