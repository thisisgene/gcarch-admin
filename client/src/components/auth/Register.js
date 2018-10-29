import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

import './Forms.css'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser)
  }
  render() {
    const { errors } = this.state

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto form-dark">
                <div className="title-container">
                  <p className="lead">Neuen User hinzufügen</p>
                  <p className="small text-muted">
                    Füllen Sie die Felder aus um einen neuen User zu erstellen.
                  </p>
                </div>
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className={classnames('form-control', {
                        'is-invalid': errors.name
                      })}
                      placeholder="Name"
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      // error={errors.name}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      className={classnames('form-control', {
                        'is-invalid': errors.email
                      })}
                      placeholder="E-mail Adresse"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}

                      // error={errors.email}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      className={classnames('form-control', {
                        'is-invalid': errors.password
                      })}
                      placeholder="Passwort"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      // error={errors.password}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      className={classnames('form-control', {
                        'is-invalid': errors.password2
                      })}
                      placeholder="Passwort bestätigen"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      // error={errors.password2}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { registerUser }
)(Register)
