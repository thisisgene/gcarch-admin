import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getTeam,
  getTeamMember,
  updateTeamMember
} from '../../../../actions/teamActions'
import { deleteImage } from '../../../../actions/imageActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'
import ImageUpload from '../ImageUpload'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
import 'react-datepicker/dist/react-datepicker.css'
import styles from '../news/NewsContent.module.sass'

class TeamContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      file: null,
      description: '',
      title: '',
      email: '',
      errors: {}
    }
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
      email: '',
      file: null,
      description: '',
      title: '',
      errors: {}
    })
    const id = this.props.match.params.id
    console.log(id)
    this.props.getTeamMember(id)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match &&
      this.props.match &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      console.log('UPDATE')
      console.log(this.props.match.params.id)
      this.setState({
        id: this.props.match.params.id,
        email: '',
        file: null,
        description: '',
        title: '',
        errors: {}
      })
      this.props.getTeamMember(this.props.match.params.id)
    }
    if (
      (!prevProps.team.teamMember && prevProps !== this.props) ||
      (prevProps.team.teamMember &&
        prevProps.team.teamMember !== this.props.team.teamMember)
    ) {
      if (this.props.team.teamMember) {
        const team = this.props.team.teamMember
        console.log('now change')
        this.setState({
          title: team.title ? team.title : '',
          email: team.email ? team.email : '',
          description: team.descriptionMarkdown ? team.descriptionMarkdown : ''
        })
        if (
          prevProps.team.teamMember &&
          this.props.team.teamMember.title !== prevProps.team.teamMember.title
        ) {
          this.props.getTeam()
        }
      }
    }
  }
  onClickDelete = id => {
    this.props.deleteImage(this.state.id, id, 'team')
  }
  onDateChange = date => {
    this.setState({ date: date })
  }
  onChange = e => {
    if (e.target.name !== 'linkExternal') {
      this.setState({ [e.target.name]: e.target.value })
    } else {
      this.setState({ [e.target.name]: e.target.checked })
    }
  }
  handleFile = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const teamData = {
      id: this.state.id,
      title: this.state.title,
      email: this.state.email,
      file: this.state.file,
      descriptionMarkdown: this.state.description,
      date: this.state.date
    }
    this.props.updateTeamMember(teamData)
  }

  render() {
    const { teamMember, saving } = this.props.team
    return (
      <div className={styles['content-container']}>
        {teamMember && (
          <div
            className={cx(styles['news-content'], {
              [styles['saving']]: saving
            })}
          >
            <div className={styles['news-content--text']}>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  name="title"
                  value={this.state.title}
                  placeholder="Neuer Beitrag"
                  onChange={this.onChange}
                  error={this.state.errors.title}
                />
                <TextFieldGroup
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="E-mail Adresse"
                  onChange={this.onChange}
                  error={this.state.errors.email}
                />
                {/* <input type="file" name="file" onChange={this.handleFile} /> */}
                <div className={styles['news-content--text__description']}>
                  <TextareaFieldGroup
                    name="description"
                    value={this.state.description}
                    placeholder="Beschreibung"
                    onChange={this.onChange}
                  />
                </div>

                <br />
                <input
                  className={commonStyles['submit-button']}
                  type="submit"
                  value="Speichern"
                />
              </form>
            </div>
            <div className={styles['news-content--image']}>
              <ImageUpload id={this.props.match.params.id} category={'team'} />
              <div>
                {teamMember.images && (
                  <div>
                    {!teamMember.images.isDeleted &&
                      teamMember.images.originalName && (
                        <div className={styles['news-content--image__item']}>
                          <button
                            className={cx(
                              globalStyles['btn'],
                              globalStyles['btn-link']
                            )}
                            onClick={this.onClickDelete.bind(
                              this,
                              teamMember.images._id
                            )}
                          >
                            <i className="fa fa-minus-circle" />
                          </button>
                          <img
                            src={`/assets/team/${this.state.id}/${
                              teamMember.images.originalName
                            }`}
                            alt=""
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  team: state.team
})
export default connect(
  mapStateToProps,
  { getTeam, getTeamMember, updateTeamMember, deleteImage }
)(TeamContent)
