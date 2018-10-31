import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

import './Forms.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  dateSwitch() {
    let hourOfDay = new Date().getHours()
    switch (true) {
      case hourOfDay < 10:
        return 'Guten Morgen!'
      case hourOfDay < 14:
        return 'Guten Tag!'
      case hourOfDay < 18:
        return 'Schönen guten Nachmittag!'
      case hourOfDay > 18:
        return 'Schönen guten Abend!'
      default:
        return 'Guten Tag'
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto form-dark">
                <div className="title-container">
                  <p className="lead">{this.dateSwitch()}</p>

                  <p className="small text-muted">
                    Zum Beginnen bite einloggen
                  </p>
                </div>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="E-mail Adresse"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="Passwort"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)
