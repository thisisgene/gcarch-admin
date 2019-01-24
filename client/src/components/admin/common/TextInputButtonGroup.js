import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import globalStyles from './Bootstrap.module.css'
import commonStyles from './Common.module.sass'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  onClick,
  disabled,
  buttonText
}) => {
  // TODO: MAKE error feedback work
  return (
    <div>
      <div
        className={cx(globalStyles['input-group'], commonStyles['dark-group'])}
      >
        <input
          className={cx(
            globalStyles['form-control'],
            commonStyles['dark-input']
          )}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={cx(
            globalStyles['input-group-append'],
            commonStyles['dark-append']
          )}
        >
          <button
            className={cx(
              globalStyles['btn'],
              globalStyles['btn-outline-secondary']
            )}
            type="button"
            onClick={onClick}
          >
            {buttonText ? buttonText : <i className="fa fa-plus-circle" />}
          </button>
        </div>
      </div>
      {error && <div className={globalStyles['invalid-feedback']}>{error}</div>}{' '}
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
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
