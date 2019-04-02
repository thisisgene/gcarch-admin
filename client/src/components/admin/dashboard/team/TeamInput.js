import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createTeamMember } from '../../../../actions/teamActions'
import TextInputButtonGroup from '../../common/TextInputButtonGroup'

import styles from './Team.module.sass'

class TeamInput extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      errors: {}
    }
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.errors !== this.props.errors) {
  //     this.setState({ errors: this.props.errors })
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClick = e => {
    this.props.createTeamMember(this.state.title)
    if (this.state.errors.length !== 0) {
      this.setState({ title: '', errors: {} })
    }
  }

  render() {
    return (
      <div className={styles['team-input']}>
        <TextInputButtonGroup
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Neues Team Mitglied"
          onChange={this.onChange}
          onClick={this.onClick}
          error={this.state.errors.title}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createTeamMember }
)(TeamInput)
