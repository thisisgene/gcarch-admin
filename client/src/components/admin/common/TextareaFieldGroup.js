import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import globalStyles from './Bootstrap.module.css'
import commonStyles from './Common.module.sass'

const TextareaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  disabled
}) => {
  return (
    <div className={globalStyles['form-group']}>
      <textarea
        className={cx(globalStyles['form-control'], commonStyles['textarea'])}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && (
        <small
          className={cx(globalStyles['form-text'], globalStyles['text-muted'])}
        >
          {info}
        </small>
      )}
      {error && <div className={globalStyles['invalid-feedback']}>{error}</div>}
    </div>
  )
}

TextareaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

export default TextareaFieldGroup
