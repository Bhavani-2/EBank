import './index.css'
import {withRouter, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

const Home = props => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onChange = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="Home-section">
      <div className="nav-section">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
          alt="Website logo"
        />
        <button className="button" type="button" onClick={onChange}>
          Logout
        </button>
      </div>
      <div className="home-card-section">
        <h1 className="head">Your Flexibility, Our Excellence</h1>
        <img
          className="card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default withRouter(Home)
