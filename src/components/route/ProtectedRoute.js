import { Redirect, Route } from 'react-router'
import { useStateValue } from '../../store/stateProvider'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [{ user }, dispatch] = useStateValue()

  return (
    <Route {...rest}>
      {user || user?.length === 0 ? <Component /> : <Redirect to='/login' />}
    </Route>
  )
}
