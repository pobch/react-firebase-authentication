import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from './context'

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null)
    })

    return () => {
      listener()
    }
  }, [firebase])

  return <AuthUserContext.Provider value={authUser}>{props.children}</AuthUserContext.Provider>
}
