import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {user_id: username, pin: password}
    // const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',

      body: JSON.stringify(userDetails),
    }

    console.log(options)

    const response = await fetch('https://apis.ccbp.in/ebank/login', options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
          alt="Website login"
          className="login-logo"
        />
        <div className="login-card">
          <h1>Welcome Back!</h1>
          <form className="form" onSubmit={this.submitForm}>
            <label htmlFor="id" className="label">
              User ID
            </label>
            <br />
            <input
              id="id"
              className="input"
              type="text"
              placeholder="Enter User ID"
              value={username}
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="pin" className="label">
              PIN
            </label>
            <br />
            <input
              id="pin"
              className="input"
              type="password"
              placeholder="Enter PIN"
              value={password}
              onChange={this.onChangePassword}
            />
            <br />
            <button type="submit">Login</button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
