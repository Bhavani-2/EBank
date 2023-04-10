import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './Component/Login'
import NotFound from './Component/NotFound'
import Home from './Component/Home'

import ProtectedRoute from './Component/ProtectedRoute'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <NotFound />
  </Switch>
)

export default App
