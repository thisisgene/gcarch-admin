import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import { clearProjects } from '../../../actions/projectActions'

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.clearProjects()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/settings">
            <i className="fas fa-cog" />
          </Link>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button
              className="btn btn-link dropdown-toggle"
              id="dLabel"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {user.name}
            </button>
            <div className="dropdown-menu" aria-labelledby="dLabel">
              <a className="dropdown-item" href="/">
                Action
              </a>
              <a className="dropdown-item" href="/">
                Another action
              </a>
              <a className="dropdown-item" href="/">
                Something else here
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="/">
                Separated link
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <button
            onClick={this.onLogoutClick.bind(this)}
            className="btn btn-link"
          >
            <i className="fas fa-sign-out-alt" />
          </button>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/login">
            <i className="fas fa-sign-in-alt" />
          </Link>
        </li>
      </ul>
    )

    return (
      <div className="header">
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/admin/">
            <img
              // src="/docs/4.1/assets/brand/bootstrap-solid.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Admin
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </div>
    )
  }
}

Header.propTypes = {
  clearProjects: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { clearProjects, logoutUser }
)(Header)
