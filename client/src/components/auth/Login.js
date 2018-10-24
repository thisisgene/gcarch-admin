import React, { Component } from 'react'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(newUser)
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
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h2 className="display-4 text-center">{this.dateSwitch()}</h2>

                <p className="lead text-center">Zum Beginnen bite einloggen</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}

                      // error={errors.email}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      // error={errors.password}
                    />
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

export default Login
