import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { SignUpLink } from '../SignUp'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  )
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

function SignInForm() {
  const [state, setState] = useState(INITIAL_STATE)
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = state
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        setState(INITIAL_STATE)
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        setState({ ...state, error })
      })
  }

  const isInvalid = state.email === '' || state.password === ''

  return (
    <form>
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email Address"
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign In
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}

export default SignInPage
