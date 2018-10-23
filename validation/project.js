const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProjectInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name darf nicht leer sein.'
  }

  // Only alphanumeric and spaces
  if (!Validator.isAlphanumeric(Validator.blacklist(data.name, ' '), 'de-DE')) {
    errors.name = 'Name darf keine Sonderzeichen enthalten.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
