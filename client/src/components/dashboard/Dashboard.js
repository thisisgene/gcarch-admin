import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CategoryNav from './CategoryNav'

class Dashboard extends Component {
  render() {
    // const { user } = this.props.auth

    return (
      <div className="dashboard">
        <h1>Hello</h1>
        <CategoryNav />
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
