import Cookies from 'js-cookie'
import {Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const value = Cookies.get('jwt_token')
  if (value !== undefined) {
    return <Route {...props} />
  }

  return <Route to="/ebank/login" />
}

export default ProtectedRoute
