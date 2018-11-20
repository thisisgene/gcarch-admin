import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import globalStyles from './Bootstrap.module.css'
import commonStyles from './Common.module.sass'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className={globalStyles['form-group']}>
      <input
        className={cx(
          globalStyles['form-control'],
          commonStyles['dark-input'],
          {
            'is-invalid': error
          }
        )}
        placeholder={placeholder}
        name={name}
        type={type}
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

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
