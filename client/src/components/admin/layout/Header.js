import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../../actions/authActions'
import { clearProjects } from '../../../actions/projectActions'

import Logo from '../common/logo_white.svg'

import cx from 'classnames'
import styles from './Header.module.sass'
import globalStyles from '../common/Bootstrap.module.css'

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.clearProjects()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className={cx(globalStyles.nav, globalStyles['justify-content-end'])}>
        <li className={globalStyles['nav-item']}>
          <Link className={globalStyles['nav-link']} to="/admin/settings">
            <i className="fas fa-cog" />
          </Link>
        </li>
        <li className={globalStyles['nav-item']}>
          <button
            className={cx(globalStyles.btn, globalStyles['btn-link'])}
            id="dLabel"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user.name}
          </button>
        </li>
        <li className={globalStyles['nav-item']}>
          <button
            onClick={this.onLogoutClick.bind(this)}
            className={cx(globalStyles.btn, globalStyles['btn-link'])}
          >
            <i className="fas fa-sign-out-alt" />
          </button>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className={cx(globalStyles.nav, globalStyles['justify-content-end'])}>
        <li className={globalStyles['nav-item']}>
          <Link className={globalStyles['nav-link']} to="/admin/login">
            <i className="fas fa-sign-in-alt" />
          </Link>
        </li>
      </ul>
    )

    return (
      <div className={styles['header']}>
        <nav
          className={cx(
            globalStyles.navbar,
            globalStyles['navbar-dark'],
            globalStyles['bg-dark']
          )}
        >
          <Link className={globalStyles['navbar-brand']} to="/admin/">
            <img
              src={Logo}
              height="30"
              className={cx(
                globalStyles['d-inline-block'],
                globalStyles['align-top']
              )}
              alt=""
            />
            <span>Admin</span>
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
