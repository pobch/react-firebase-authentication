import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'

function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
}
function SignUpForm() {
  const [state, setState] = useState(INITIAL_STATE)
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleChangeCheckbox(e) {
    setState({ ...state, isAdmin: e.target.checked })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { username, email, passwordOne, isAdmin } = state
    let roles = {}
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return firebase.user(authUser.user.uid).set({ username, email, roles })
      })
      .then(() => {
        setState(INITIAL_STATE)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        setState(prev => ({ ...prev, error }))
      })
  }

  const isInvalid =
    state.passwordOne !== state.passwordTwo ||
    state.passwordOne === '' ||
    state.email === '' ||
    state.username === ''

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={state.username}
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        onChange={handleChange}
        value={state.email}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        name="passwordOne"
        onChange={handleChange}
        value={state.passwordOne}
        placeholder="Password"
      />
      <input
        type="password"
        name="passwordTwo"
        onChange={handleChange}
        value={state.passwordTwo}
        placeholder="Confirm Password"
      />
      <label>
        Admin:
        <input
          type="checkbox"
          name="isAdmin"
          checked={state.isAdmin}
          onChange={handleChangeCheckbox}
        />
      </label>
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}

function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  )
}

export default SignUpPage
export { SignUpForm, SignUpLink }
