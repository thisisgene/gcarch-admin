import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

class Team extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
  }
  render() {
    return (
      <div>
        <p>Team</p>
      </div>
    )
  }
}
export default connect(
  null,
  { hasBackgroundImage }
)(Team)
