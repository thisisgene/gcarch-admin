import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoS from '../common/logo.svg'
import LogoW from '../common/logo_white.svg'

import cx from 'classnames'
import styles from './Header.module.sass'

class Header extends Component {
  render() {
    // NOTE: Does link to admin make sense?
    // const toAdmin = this.props.auth ? (
    //   <NavLink to="../admin">To Admin</NavLink>
    // ) : (
    //   ''
    // )
    const { hasBackgroundImage } = this.props
    if (hasBackgroundImage) {
      console.log('hello')
    }
    return (
      <div
        className={cx(styles.header, {
          [styles['black-header']]: !hasBackgroundImage
        })}
      >
        <div className={styles.logo}>
          <NavLink to="/user">
            <img
              src={hasBackgroundImage ? LogoW : LogoS}
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

// const mapStateToProps = state => ({
//   hasBackgroundImage: state.hasBackgroundImage
// })

// export default connect(
//   mapStateToProps,
//   {}
// )(Header)

export default Header
