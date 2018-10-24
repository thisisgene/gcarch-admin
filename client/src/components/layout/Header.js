import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            <img
              // src="/docs/4.1/assets/brand/bootstrap-solid.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Admin
          </Link>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/settings">
                <i className="fas fa-cog" />
              </Link>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="dLabel"
                  href="/"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  user.name
                </a>
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
              <Link className="nav-link" to="/logout">
                <i className="fas fa-sign-out-alt" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header
