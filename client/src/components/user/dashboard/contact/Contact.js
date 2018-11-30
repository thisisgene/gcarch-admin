import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import Map from './Map'

import styles from './Contact.module.sass'

class Contact extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
  }
  render() {
    return (
      <div className={styles['contact-container']}>
        <h3>GC Architektur</h3>
        <p>DDI Roman Gecse & DI Bertram Chiba</p>
        <p>Neubaugasse 6/17, A-1070 Wien</p>
        <p>NÖ: Max Kahrer-Gasse 19, 3400 Klosterneuburg</p>
        <br />
        <p>t +43 1 9971383-0</p>
        <p>f +43 1 9971383-11</p>
        <p>
          <a href="">office@gc-architektur.at</a>
        </p>
        <Map />
      </div>
    )
  }
}
export default connect(
  null,
  { hasBackgroundImage }
)(Contact)
