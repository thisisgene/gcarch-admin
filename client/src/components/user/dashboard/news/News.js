import React, { Component } from 'react'

import store from '../../../../store'
import { clearCurrentProject } from '../../../../actions/projectActions'

class News extends Component {
  componentDidMount() {
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

export default News
