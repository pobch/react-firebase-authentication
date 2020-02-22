import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

function PasswordChangeForm() {
  const [state, setState] = useState(INITIAL_STATE)
  const firebase = useContext(FirebaseContext)

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    firebase
      .doPasswordUpdate(state.passwordOne)
      .then(() => {
        setState(INITIAL_STATE)
      })
      .catch(error => {
        setState(prev => ({ ...prev, error }))
      })
  }

  const isInvalid = state.passwordOne === '' || state.passwordOne !== state.passwordTwo
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="passwordOne"
        type="password"
        value={state.passwordOne}
        onChange={handleChange}
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        type="password"
        value={state.passwordTwo}
        onChange={handleChange}
        placeholder="Confirm New Password"
      />
      <button type="submit" disabled={isInvalid}>
        Reset My Password
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  )
}

export default PasswordChangeForm
