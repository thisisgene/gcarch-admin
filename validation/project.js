const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProjectInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.title = !isEmpty(data.title) ? data.title : ''
  data.handle = !isEmpty(data.handle) ? data.handle : ''

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name darf nicht leer sein.'
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Titel darf nicht leer sein.'
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle darf nicht leer sein.'
  }
  if (!Validator.isLength(data.handle, { min: 3, max: 40 })) {
    errors.handle = 'Handle muss zwischen 3 und 40 Zeichen lang sein.'
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
