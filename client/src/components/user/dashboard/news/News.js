import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

class News extends Component {
  componentDidMount() {
    this.props.hasBackgroundImage(false)
    store.dispatch(clearCurrentProject())
  }
  render() {
    return (
      <div>
        <p>Aktuell</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // hasBackgroundImage: state.hasBackgroundImage
})

export default connect(
  mapStateToProps,
  { hasBackgroundImage }
)(News)
