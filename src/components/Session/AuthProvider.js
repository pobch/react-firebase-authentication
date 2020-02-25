import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from './context'

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.onAuthUserListener(
      authUser => {
        localStorage.setItem('authUser', JSON.stringify(authUser))
        setAuthUser(authUser)
      },
      () => {
        localStorage.removeItem('authUser')
        setAuthUser(null)
      }
    )

    return () => {
      listener()
    }
  }, [firebase])

  return <AuthUserContext.Provider value={authUser}>{props.children}</AuthUserContext.Provider>
}
