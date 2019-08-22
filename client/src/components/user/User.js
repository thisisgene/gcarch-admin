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
      auth: false,
      currentProject: null,
      backgroundImg: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.project != this.props.project) {
      if (this.props.project.project) {
        const project = this.props.project.project
        this.setState({
          currentProject: project
        })
        if (project && project.backgroundImage) {
          this.setState(
            {
              backgroundImg: `/assets/projekte/${project._id}/${
                project.backgroundImage.originalName
              }`
            },
            () => console.log('HAS A BACKGOURND', this.state.backgroundImg)
          )
        }
      } else {
        this.setState({
          currentProject: null
        })
      }
    }
  }

  render() {
    const { hasBackgroundImage } = this.props.project

    return (
      <div className={styles.user}>
        {this.state.backgroundImg !== '' && (
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${this.state.backgroundImg})`
            }}
          />
        )}
        <Header
          hasBackgroundImage={hasBackgroundImage}
          currentProject={this.state.currentProject}
        />
        <Switch>
          <Route exact path="/" component={Landing} />
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
