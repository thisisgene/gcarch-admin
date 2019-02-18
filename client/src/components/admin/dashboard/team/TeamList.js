import React, { Component } from 'react'

import TeamInput from './TeamInput'

import styles from './Team.module.sass'

export default class TeamList extends Component {
  render() {
    return (
      <div className={styles['team-list-container']}>
        <TeamInput />
        <div className={styles['team-list']}>
          {/* {team.team &&
            team.team.map((item, index) => (
              <TeamListItem key={index} item={item} />
            ))} */}
        </div>
      </div>
    )
  }
}
