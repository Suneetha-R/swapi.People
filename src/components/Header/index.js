import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <ul className="header-ul-container">
        <li className="home-jobs-container">
          <Link className="link" to="/">
            <h1 className="nav-text">Home</h1>
          </Link>
          <Link className="link" to="/profiles">
            <h1 className="nav-text">Profiles</h1>
          </Link>
        </li>
        <li>
          <button type="button" className="btn-logout" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
