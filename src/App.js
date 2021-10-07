import { Nav } from './components/Nav/Nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Home } from './Layout/Home'
import { Chat } from './Layout/Chat'

import Perfil from './Layout/Perfil'
import { ProtectedRoute } from './components/route/ProtectedRoute'
import { useStateValue } from './store/stateProvider'
import Login from './Layout/Login'
import Register from './Layout/Register'

function App () {
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className='App'>
      <Router>
        <div className='app'>
          <Nav />
          <Switch>
            <ProtectedRoute exact path='/perfil' component={Perfil} />
            <ProtectedRoute exact path='/chat' component={Chat} />
            <ProtectedRoute exact path='/' component={Home} />
            <Route
              path='/login'
              exact
              render={() => {
                return user ? <Redirect to='/' /> : <Login />
              }}
            />
            <Route path='/Register' exact>
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
