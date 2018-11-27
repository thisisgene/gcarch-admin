import React from 'react'

import cx from 'classnames'
import globalStyles from '../common/Bootstrap.module.css'

export default () => {
  return (
    <footer
      className={cx(
        globalStyles['bg-dark'],
        globalStyles['text-white'],
        globalStyles['p-2'],
        globalStyles['text-center']
      )}
    >
      <small>&copy; {new Date().getFullYear()} Serious Pigeon</small>
    </footer>
  )
}
