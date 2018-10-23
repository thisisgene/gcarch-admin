const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = 'Name muss zwischen 3 und 30 Buchstaben lang sein.'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name darf nicht leer sein.'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'E-mail Adresse darf nicht leer sein.'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'E-mail Adresse ist ungültig.'
  }
  if (!Validator.isLength(data.password, { min: 6, max: 80 })) {
    errors.password = 'Passwort muss zwischen 6 und 80 Buchstaben lang sein.'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwort darf nicht leer sein.'
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Passwortbestätigung darf nicht leer sein.'
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwörter müssen ident sein.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
