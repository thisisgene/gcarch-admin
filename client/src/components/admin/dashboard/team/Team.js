import React, { Component } from 'react'

import TeamList from './TeamList'

import styles from './Team.module.sass'

export default class Team extends Component {
  render() {
    return (
      <div className={styles['team']}>
        <TeamList />
      </div>
    )
  }
}
