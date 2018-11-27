import React, { Component } from 'react'

import store from '../../../../store'
import { clearCurrentProject } from '../../../../actions/projectActions'

class Team extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
  }
  render() {
    return (
      <div>
        <p>Team</p>
      </div>
    )
  }
}

export default Team
