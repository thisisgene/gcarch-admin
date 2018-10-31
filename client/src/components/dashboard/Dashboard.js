import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProjects } from '../../actions/projectActions'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAllProjects()
  }

  render() {
    const { user } = this.props.auth
    const { projects, loading } = this.props.project

    let dashboardContent

    if (projects === null || loading) {
      dashboardContent = <h4>Loading...</h4>
    } else {
      dashboardContent = (
        <div>
          <h1>Hallo, {user.name}</h1>
          <p>{projects.noprojects ? projects.noprojects : 'Projekte'}</p>
        </div>
      )
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllProjects }
)(Dashboard)
