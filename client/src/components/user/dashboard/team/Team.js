import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import { teamData } from './teamData'

import styles from './Team.module.sass'

import imgBertram from '../../common/img/bertram.png'

class Team extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
  }

  onBioClick = e => {}

  render() {
    let teamList = []
    if (teamData) {
      for (const [index, value] of Object.entries(teamData)) {
        teamList.push(
          <div key={index} className={styles['team-member']}>
            <img src={value.img} alt="" />
            <div className={styles['team-member-info']}>
              <div className={styles['team-member-name']}>{value.name}</div>
              <div className={styles['team-member-email']}>{value.email}</div>
              {value.description && (
                <div className={styles['biographie']}>
                  <div
                    className={styles['biographie--link']}
                    onClick={this.onBioClick}
                  >
                    Kurzbiographie
                  </div>
                  <div className={styles['team-member-description']}>
                    {value.description}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
    }

    return <div className={styles['team-container']}>{teamList}</div>
  }
}
export default connect(
  null,
  { hasBackgroundImage }
)(Team)
