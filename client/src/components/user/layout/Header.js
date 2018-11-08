import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    // NOTE: Does link to admin make sense?
    const toAdmin = this.props.auth ? <Link to="../admin">To Admin</Link> : ''

    return (
      <div>
        <Link to="/user">
          <h1>GC Architektur</h1>
        </Link>
        <Link to="/user/projects">Projekte</Link>
        <Link to="/user/news">Aktuell</Link>
        <Link to="/user/team">Team</Link>
        <Link to="/user/contact">Kontakt</Link>
        {toAdmin}
      </div>
    )
  }
}
