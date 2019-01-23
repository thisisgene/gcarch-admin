import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import styles from './Team.module.sass'

import imgBertram from '../../common/img/bertram.png'

class Team extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
  }
  render() {
    const teamData = [
      {
        position: 1,
        name: 'Bertram Chiba',
        email: 'chiba@gc­-architektur.at',
        description:
          'Studium der Architektur an der Technischen Universität Wien; Abschluss an der Technischen Universität Wien, ZT Befugnis Architektur seit 2011, Gründung GC Archi­ tektur 2011, Gründung Projektplattform PP1 2013',
        img: '/assets/team/bertram.png'
      },
      {
        position: 2,
        name: 'Roman Gecse',
        email: 'gecse@gc­-architektur.at',
        description:
          'Studium der Architektur an der Akademie der bildenden Künste, Abschluss an der Technischen Universität Wien, Institut f. Wohnbau, ZT Befugnis Bauingenieurwesen Baumanagement u. Architektur seit 2011, Gründung GC Architektur 2011, Gründung Projektplattform PP1 2013',
        img: '/assets/team/roman.png'
      },
      {
        position: 3,
        name: 'Bertram',
        email: 'chiba@gc­-architektur.at',
        description: '',
        img: '/assets/team/bertram.png'
      },
      {
        position: 4,
        name: 'Roman',
        email: 'gecse@gc­-architektur.at',
        description: '',
        img: '/assets/team/roman.png'
      },
      {
        position: 5,
        name: 'Bertram',
        email: 'chiba@gc­-architektur.at',
        description: '',
        img: '/assets/team/bertram.png'
      },
      {
        position: 2,
        name: 'Roman',
        email: 'gecse@gc­-architektur.at',
        description: '',
        img: '/assets/team/roman.png'
      }
    ]
    let teamList = []
    if (teamData) {
      for (const [index, value] of Object.entries(teamData)) {
        teamList.push(
          <div key={index} className={styles['team-member']}>
            <img src={value.img} alt="" />
            <div className={styles['team-member-info']}>
              <div className={styles['team-member-name']}>{value.name}</div>
              <div className={styles['team-member-email']}>{value.email}</div>
              <div className={styles['team-member-description']}>
                {value.description}
              </div>
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
