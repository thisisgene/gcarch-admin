import React, { Component } from 'react'
import { connect } from 'react-redux'

import store from '../../../../store'
import {
  clearCurrentProject,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import Map from './Map'
import { mapApiLink } from '../../../config/config'

import styles from './Contact.module.sass'

class Contact extends Component {
  componentDidMount() {
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
  }
  render() {
    return (
      <div className={styles['contact-container']}>
        <div className={styles['map']}>
          <Map mapApiLink={mapApiLink} />
        </div>
        <div className={styles['contact-container--info']}>
          <h3>GC Architektur</h3>
          <p>Neubaugasse 6/17</p>
          <p>A-1070 Wien</p>
          <br />
          <p>t +43 1 9971383-0</p>
          <p>
            <span>office</span>
            <span>@</span>
            <span>gc-architektur</span>
            <span>.</span>
            <span>at</span>
          </p>
          <br />
          <p>Arch. DDI Roman Gecse & Arch. DI Bertram Chiba</p>
          <p>
            Mitglieder der Kammer der Architekten und IK f. Wien, NÖ u. Bgld.
          </p>
          <p>Berufsrecht: Ziviltechnikergesetz i.d.g.F.</p>
          <p>UID: ATU66452046</p>
        </div>
      </div>
    )
  }
}
export default connect(
  null,
  { hasBackgroundImage }
)(Contact)
