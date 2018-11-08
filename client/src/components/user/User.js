import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from './layout/Header'
import Landing from './dashboard/Landing'
import Projects from './dashboard/projects/Projects'

export default class User extends Component {
  render() {
    return (
      <div>
        <Header />

        <Route exact path="/user" component={Landing} />
        <Route path="/user/projects" component={Projects} />
      </div>
    )
  }
}
