import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '../common/logo_white.svg'

import styles from './Header.module.sass'

export default class Header extends Component {
  render() {
    // NOTE: Does link to admin make sense?
    // const toAdmin = this.props.auth ? (
    //   <NavLink to="../admin">To Admin</NavLink>
    // ) : (
    //   ''
    // )

    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/user">
            <img
              src={Logo}
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
          </NavLink>
        </div>
        <div className={styles['menu-container']}>
          <NavLink activeClassName={styles.active} to="/user/aktuell">
            Aktuell
          </NavLink>
          <NavLink activeClassName={styles.active} to="/user/projekte">
            Projekte
          </NavLink>
          <NavLink activeClassName={styles.active} to="/user/team">
            Team
          </NavLink>
          <NavLink activeClassName={styles.active} to="/user/kontakt">
            Kontakt
          </NavLink>
          {/* {toAdmin} */}
        </div>
      </div>
    )
  }
}
