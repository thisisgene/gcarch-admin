import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { deleteTeamMember } from '../../../../actions/teamActions'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import styles from './Team.module.sass'

class TeamListItem extends Component {
  onClickDelete = id => {
    this.props.deleteTeamMember(id)
  }
  render() {
    const { item } = this.props
    return (
      <div className={styles['team-list--item']}>
        <button
          className={cx(globalStyles['btn'], globalStyles['btn-link'])}
          onClick={this.onClickDelete.bind(this, item._id)}
        >
          <i className="fa fa-minus-circle" />
        </button>
        <NavLink
          activeClassName={styles['active']}
          to={`/admin/team/${item._id}`}
        >
          {item.title}
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(
  mapStateToProps,
  { deleteTeamMember }
)(TeamListItem)
