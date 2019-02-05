import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import styles from './Dashboard.module.sass'

class Dashboard extends Component {
  render() {
    // const { user } = this.props.auth

    return (
      <div className={styles['category-nav']}>
        <NavLink
          className={styles['category-nav--link']}
          activeClassName={styles['active']}
          to="/admin/projects"
        >
          Projekte
        </NavLink>
        <NavLink
          className={styles['category-nav--link']}
          activeClassName={styles['active']}
          to="/admin/aktuelles"
        >
          Aktuelles
        </NavLink>
      </div>
    )
  }
}

export default Dashboard
