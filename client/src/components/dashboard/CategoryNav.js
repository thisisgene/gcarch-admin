import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    // const { user } = this.props.auth

    return (
      <div className="dashboard">
        <NavLink activeClassName="active" to="/projects">
          Projects
        </NavLink>
        <NavLink activeClassName="active" to="/news">
          News
        </NavLink>
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
