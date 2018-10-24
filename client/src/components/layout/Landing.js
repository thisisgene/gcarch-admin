import React, { Component } from 'react'

class Landing extends Component {
  render() {
    return (
      <div className="p-3 text-center">
        <h2>Hallo!</h2>
        <h3>Zum Fortfahren bitte einloggen</h3>
        <div className="login">
          <a href="/login" className="btn btn-primary">
            Login
          </a>
        </div>
      </div>
    )
  }
}

export default Landing
