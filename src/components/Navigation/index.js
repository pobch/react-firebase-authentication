import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from '../SignOut'
import { AuthUserContext } from '../Session'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

function Navigation() {
  const authUser = useContext(AuthUserContext)
  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
}

function NavigationAuth() {
  const authUser = useContext(AuthUserContext)
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  )
}

function NavigationNonAuth() {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
