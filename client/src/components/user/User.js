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
  componentDidMount() {}
  render() {
    const { project, hasBackgroundImage } = this.props.project
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
        <Header hasBackgroundImage={hasBackgroundImage} />
        <Switch>
          <Route exact path="/user" component={Landing} />
          <MainContent />
        </Switch>
      </div>
    )
  }
}

User.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  hasBackgroundImage: state.hasBackgroundImage
})

export default withRouter(
  connect(
    mapStateToProps,
    { getAllProjects, getProjectById }
  )(User)
)
