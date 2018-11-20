import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects, getProjectById } from '../../actions/projectActions'

import Header from './layout/Header'
import Landing from './dashboard/Landing'
import Projects from './dashboard/projects/Projects'
import Project from './dashboard/projects/Project'

import styles from './User.module.sass'

class User extends Component {
  constructor() {
    super()
    this.state = {
      auth: false
    }
  }
  componentDidMount() {
    this.setState({ auth: this.props.auth.isAuthenticated })
  }
  render() {
    const background_img =
      'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

    return (
      <div className={styles.user}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${background_img}` }}
        />
        <Header auth={this.state.auth} />

        <Route exact path="/user" component={Landing} />
        <Route exact path="/user/projekte" component={Projects} />
        <Route
          exact
          path="/user/projekte/:id"
          props={this.props}
          component={Project}
        />
      </div>
    )
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

export default connect(
  mapStateToProps,
  { getAllProjects, getProjectById }
)(User)
