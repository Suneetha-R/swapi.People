import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtoctedRoute'
import ForgotPassword from './components/ForgetPassword'
import SignUp from './components/SignUpForm'
import Profile from './components/Profile'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/forgetPassword" component={ForgotPassword} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/profiles" component={Profile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
