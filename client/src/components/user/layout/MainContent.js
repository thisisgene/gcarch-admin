import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects, getProjectById } from '../../../actions/projectActions'

import News from '../dashboard/news/News'
import ProjectGrid from '../dashboard/projects/ProjectGrid'
import Project from '../dashboard/projects/Project'
import Team from '../dashboard/team/Team'
import Contact from '../dashboard/contact/Contact'

import styles from './MainContent.module.sass'

class MainContent extends Component {
  constructor() {
    super()
    this.state = {
      auth: false
    }
  }
  componentDidMount() {
    this.setState({
      auth: this.props.auth.isAuthenticated
    })
  }
  render() {
    const { project } = this.props.project

    return (
      <div className={styles['main-content']}>
        <Route exact path="/aktuell" component={News} />
        <Route exact path="/projekte" component={ProjectGrid} />
        <Route
          exact
          path="/projekte/:id"
          props={this.props}
          component={Project}
        />
        <Route exact path="/team" component={Team} />
        <Route exact path="/kontakt" component={Contact} />
      </div>
    )
    // return <div>hallo</div>
  }
}

MainContent.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
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
    { getAllProjects, getProjectById }
  )(MainContent)
)
