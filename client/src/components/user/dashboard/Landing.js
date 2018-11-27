import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store from '../../../store'
import { clearCurrentProject } from '../../../actions/projectActions'

import styles from './Landing.module.sass'

class Landing extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
  }
  render() {
    const { projects } = this.props.project
    if (projects != null) {
      const image = projects[0].name
      console.log(image)
    }
    return (
      <div className={styles['home-page']}>
        <div className="background-image">
          <img src="" alt="" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {}
)(Landing)
