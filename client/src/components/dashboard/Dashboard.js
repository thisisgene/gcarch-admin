import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProjectList from './ProjectList'
import ProjectContent from './ProjectContent'

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth

    return (
      <div className="dashboard">
        <ProjectList />
        <ProjectContent />
      </div>
    )
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(Dashboard)
