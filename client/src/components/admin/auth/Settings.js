import React, { Component } from 'react'

import Register from './Register'

class Settings extends Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
        <h3>User hinzufügen</h3>
        <Register />
      </div>
    )
  }
}

export default Settings
