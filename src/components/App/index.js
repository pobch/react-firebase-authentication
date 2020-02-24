import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import { AuthProvider, withAuthorization } from '../Session'

function isAuth(authUser) {
  return !!authUser
}

function isAdmin(authUser) {
  return !!authUser && authUser.roles && authUser.roles[ROLES.ADMIN]
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.HOME} component={withAuthorization(isAuth)(HomePage)} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.ACCOUNT} component={withAuthorization(isAuth)(AccountPage)} />
        <Route exact path={ROUTES.ADMIN} component={withAuthorization(isAdmin)(AdminPage)} />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
