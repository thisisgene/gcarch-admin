import React, { Component } from 'react'

import styles from './Contact.module.sass'

export default class Map extends Component {
  render() {
    return (
      <div className={styles.map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.4042511444227!2d16.3477149512022!3d48.19882895477005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d078c0df7ae59%3A0x1d53b4f5f9ad84f6!2sNeubaugasse+6%2C+1070+Wien!5e0!3m2!1sen!2sat!4v1543329859062"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    )
  }
}
