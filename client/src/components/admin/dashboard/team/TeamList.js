import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import axios from 'axios'

import arrayMove from 'array-move'

import { getTeam } from '../../../../actions/teamActions'

import TeamInput from './TeamInput'
import TeamListItem from './TeamListItem'

import styles from './Team.module.sass'

const SortableItem = SortableElement(({ item, index }) => (
  <TeamListItem key={index} item={item} />
))

const SortableList = SortableContainer(({ items, category }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} />
      ))}
    </ul>
  )
})

class TeamList extends Component {
  constructor() {
    super()
    this.state = {
      teamList: []
    }
  }
  componentDidMount() {
    this.props.getTeam()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.team != this.props.team) {
      this.setState({ teamList: this.props.team.team })
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ teamList }) => ({
        teamList: arrayMove(teamList, oldIndex, newIndex)
      }),
      () => {
        console.log(this.state.teamList)
        axios
          .post('/api/team/sort', { teamList: this.state.teamList })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            if (err) console.log(err)
          })
      }
    )
  }

  render() {
    const team = this.state.teamList
    return (
      <div className={styles['team-list-container']}>
        <TeamInput />
        <div className={styles['team-list']}>
          <SortableList
            lockAxis={'y'}
            pressDelay={200}
            helperClass={styles['dragged']}
            items={team}
            onSortEnd={this.onSortEnd}
          />
          {/* {team &&
            team.map((item, index) => <TeamListItem key={index} item={item} />)} */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  team: state.team,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { getTeam }
)(TeamList)
