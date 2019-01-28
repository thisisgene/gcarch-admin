import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import globalStyles from './Bootstrap.module.css'
import commonStyles from './Common.module.sass'

const SelectFieldGroup = ({ name, onChange, options, value, disabled }) => {
  let optionArray = []
  for (let [index, option] of options.entries()) {
    optionArray.push(<option key={index}>{option}</option>)
  }

  return (
    <div>
      <select
        value={value}
        className={cx(
          globalStyles['custom-select'],
          commonStyles['custom-select'],
          commonStyles['dark-input']
        )}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        {optionArray}
      </select>
    </div>
  )
}

SelectFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

export default SelectFieldGroup
