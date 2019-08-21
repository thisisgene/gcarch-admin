import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'
import { getTeam } from '../../../../actions/teamActions'

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
    this.props.getTeam()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.team) {
      const showBio = []
      this.props.team.team &&
        this.props.team.team.map(item => {
          showBio[item.title] = false
        })
      this.setState({
        showBio: showBio
      })
    }
  }

  onBioClick = e => {
    const showBio = this.state.showBio
    showBio[e.target.name] = !showBio[e.target.name]
    this.setState({
      showBio: showBio
    })
  }

  render() {
    const { team } = this.props.team
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

    return (
      <div>
        <span dangerouslySetInnerHTML={{ __html: '<!--noindex-->' }} />
        <div
          className={cx(styles['team-container'], {
            [styles['ie11']]: isIE11
          })}
        >
          {team &&
            team.map((item, index) => (
              <div key={index} className={styles['team-member']}>
                <div className={styles['team-member--image']}>
                  {item.images.originalName && !item.images.isDeleted ? (
                    <img
                      src={`/assets/team/${item._id}/${
                        item.images.originalName
                      }`}
                      alt=""
                    />
                  ) : (
                    <img src={`/assets/team/placeholder2.jpg`} alt="" />
                  )}
                </div>
                <div className={styles['team-member-info']}>
                  <div className={styles['team-member-name']}>{item.title}</div>
                  <div className={styles['team-member-email']}>
                    {item.email}
                  </div>
                  {item.descriptionHtml && (
                    <div className={styles['biographie']}>
                      <button
                        className={styles['biographie--link']}
                        onClick={this.onBioClick}
                        name={item.title}
                      >
                        Kurzbiographie
                      </button>
                      <div
                        className={cx(styles['team-member-description'], {
                          [styles['visible']]: this.state.showBio[item.title]
                        })}
                        dangerouslySetInnerHTML={{
                          __html: item.descriptionHtml
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <span dangerouslySetInnerHTML={{ __html: '<!--/noindex-->' }} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  team: state.team
})

export default connect(
  mapStateToProps,
  { hasBackgroundImage, getTeam }
)(Team)
