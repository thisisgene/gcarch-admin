import React, { Component } from 'react'

import Cheatsheet from '../../common/layout_cheatsheet.svg'

import styles from './Projects.module.sass'

export default function ProjectLayoutCheatsheet() {
  return (
    <div className={styles.cheatsheet}>
      <img src={Cheatsheet} alt="" />
    </div>
  )
}
