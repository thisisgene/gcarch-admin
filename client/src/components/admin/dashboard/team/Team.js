import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import TeamList from './TeamList'
import TeamContent from './TeamContent'

import styles from './Team.module.sass'

export default class Team extends Component {
  render() {
    return (
      <div className={styles['team']}>
        <TeamList />
        <Route
          path="/admin/team/:id"
          props={this.props}
          component={TeamContent}
        />
      </div>
    )
  }
}
