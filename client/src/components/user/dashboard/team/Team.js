import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import { teamData } from './teamData'

import cx from 'classnames'
import styles from './Team.module.sass'

class Team extends Component {
  constructor() {
    super()
    this.state = {
      showBio: []
    }
  }
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
    const showBio = []
    teamData &&
      teamData.map(item => {
        showBio[item.name] = false
      })
    this.setState({
      showBio: showBio
    })
    console.log(showBio)
  }

  // componentDidUpdate()

  onBioClick = e => {
    console.log(this.state.showBio, e.target.name)
    const showBio = this.state.showBio
    showBio[e.target.name] = !showBio[e.target.name]
    this.setState({
      showBio: showBio
    })
  }

  render() {
    return (
      <div className={styles['team-container']}>
        {teamData &&
          teamData.map((item, index) => (
            <div key={index} className={styles['team-member']}>
              <img src={item.img} alt="" />
              <div className={styles['team-member-info']}>
                <div className={styles['team-member-name']}>{item.name}</div>
                <div className={styles['team-member-email']}>{item.email}</div>
                {item.description && (
                  <div className={styles['biographie']}>
                    <button
                      className={styles['biographie--link']}
                      onClick={this.onBioClick}
                      name={item.name}
                    >
                      Kurzbiographie
                    </button>
                    <div
                      className={cx(styles['team-member-description'], {
                        [styles['visible']]: this.state.showBio[item.name]
                      })}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    )
  }
}
export default connect(
  null,
  { hasBackgroundImage }
)(Team)
