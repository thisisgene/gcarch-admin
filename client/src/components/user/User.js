import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects, getProjectById } from '../../actions/projectActions'

import Header from './layout/Header'
import Landing from './dashboard/Landing'
import MainContent from './layout/MainContent'

import styles from './User.module.sass'

class User extends Component {
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
    this.props.getAllProjects()
  }
  render() {
    const { project } = this.props.project
    let backgroundImg = ''
    if (project && project.backgroundImage) {
      backgroundImg =
        project &&
        `/public/${project._id}/${project.backgroundImage.originalName}`
    }
    return (
      <div className={styles.user}>
        <div
          className={styles.background}
          style={{
            backgroundImage:
              backgroundImg != '' ? `url(${backgroundImg}` : 'none'
          }}
        />
        <Header auth={this.state.auth} />
        <Switch>
          <Route exact path="/user" project={project} component={Landing} />
          <MainContent />
        </Switch>
      </div>
    )
    // return <div>hallo</div>
  }
}

User.propTypes = {
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
  )(User)
)
