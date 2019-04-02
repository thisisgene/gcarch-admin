const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  data.title = !isEmpty(data.title) ? data.title : ''

  if (Validator.isEmpty(data.title)) {
    errors.team = 'E-mail Adresse darf nicht leer sein.'
  }
  // if (!Validator.isEmail(data.email)) {
  //   errors.email = 'E-mail Adresse ist ungültig.'
  // }
  // if (Validator.isEmpty(data.password)) {
  //   errors.password = 'Passwort darf nicht leer sein.'
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
