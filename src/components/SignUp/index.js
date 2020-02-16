import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

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
  error: null
}
function SignUpForm() {
  const [state, setState] = useState(INITIAL_STATE)
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { username, email, passwordOne } = state

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        setState(INITIAL_STATE)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        setState({ ...state, error })
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
