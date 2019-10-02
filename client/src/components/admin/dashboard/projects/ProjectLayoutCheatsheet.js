import React, { Component } from 'react'

import Cheatsheet from '../../common/layout_cheatsheet.svg'

import cx from 'classnames'
import styles from './Projects.module.sass'
import gridStyles from '../../../user/dashboard/projects/ProjectGrid.module.sass'
import { rankOptions } from '../../../config/config'

export default function ProjectLayoutCheatsheet() {
  let imageDummyList = []
  for (let i = 1; i <= rankOptions; i++) {
    imageDummyList.push(
      <div
        index={i}
        className={cx(
          gridStyles['grid-item'],
          gridStyles[`grid-item--${i}`],
          styles['cheatsheet-item']
        )}
        style={{ order: i }}
        key={i}
      >
        <div className={styles['cheatsheet-item--label']}>{i}</div>
      </div>
    )
  }
  return (
    <div className={cx(styles.cheatsheet, gridStyles['grid'])}>
      {/* <img src={Cheatsheet} alt="" /> */}
      {imageDummyList}
    </div>
  )
}
