import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class ForgotPassword extends Component {
  state = {
    username: '',
    conformPassword: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onGetUsername = event => this.setState({username: event.target.value})

  onGetConformPassword = event =>
    this.setState({conformPassword: event.target.value})

  onGetPassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password, conformPassword} = this.state
    const userDetails = {username, password, conformPassword}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      conformPassword,
      showSubmitError,
      errorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginForm}
        >
          <label className="form-label" htmlFor="username">
            Email
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={this.onGetUsername}
            placeholder="username"
            id="username"
          />
          <br />
          <br />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={this.onGetPassword}
            placeholder="password"
            id="password"
          />
          <br />
          <label className="form-label" htmlFor="conformPassword">
            conformPassword
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={conformPassword}
            onChange={this.onGetConformPassword}
            placeholder="conformPassword"
            id="conformPassword"
          />
          <br />
          <button className="form-submit-button" type="submit">
            Change Password
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default ForgotPassword
