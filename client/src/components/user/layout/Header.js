import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import LogoS from '../common/logo.svg'
import LogoW from '../common/logo_white.svg'

import cx from 'classnames'
import styles from './Header.module.sass'

class Header extends Component {
  state = {
    mobileExpand: false
  }

  onMobileNavClick = () => {
    this.setState({
      mobileExpand: !this.state.mobileExpand
    })
  }

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
          <NavLink
            onClick={this.state.mobileExpand && this.onMobileNavClick}
            to="/user"
          >
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
        <div className={styles['mobile-menu-container']}>
          <div
            className={cx(styles['mobile-menu'], {
              [styles['expanded']]: this.state.mobileExpand
            })}
          >
            <NavLink
              activeClassName={styles.active}
              onClick={this.onMobileNavClick}
              to="/user/aktuell"
            >
              Aktuell
            </NavLink>
            <NavLink
              activeClassName={styles.active}
              onClick={this.onMobileNavClick}
              to="/user/projekte"
            >
              Projekte
            </NavLink>
            <NavLink
              activeClassName={styles.active}
              onClick={this.onMobileNavClick}
              to="/user/team"
            >
              Team
            </NavLink>
            <NavLink
              activeClassName={styles.active}
              onClick={this.onMobileNavClick}
              to="/user/kontakt"
            >
              Kontakt
            </NavLink>
          </div>
          <div className={styles['mobile-menu-button']}>
            <div onClick={this.onMobileNavClick}>
              <span
                className={cx(styles['nav-burger'], {
                  [styles['burger-expand']]: this.state.mobileExpand
                })}
              />
            </div>
          </div>
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
