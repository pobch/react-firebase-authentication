import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

function PasswordForgetPage() {
  return (
    <div>
      <h1>Password Forget</h1>
      <PasswordForgetForm />
    </div>
  )
}

const INITIAL_STATE = {
  email: '',
  error: null
}

function PasswordForgetForm() {
  const [state, setState] = useState(INITIAL_STATE)
  const firebase = useContext(FirebaseContext)

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    firebase
      .doPasswordReset(state.email)
      .then(() => {
        setState(INITIAL_STATE)
      })
      .catch(error => setState(prev => ({ ...prev, error })))
  }

  const isInvalid = state.email === ''
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email Address"
      />
      <button type="submit" disabled={isInvalid}>
        Reset My Password
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}

function PasswordForgetLink() {
  return (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  )
}

export default PasswordForgetPage
export { PasswordForgetForm, PasswordForgetLink }
