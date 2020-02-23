import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import { AuthUserContext } from './context'
import * as ROUTES from '../../constants/routes'

function withAuthorization(condition) {
  return function(Component) {
    function EnhancedComponent(props) {
      const firebase = useContext(FirebaseContext)
      const authUser = useContext(AuthUserContext)
      const history = useHistory()
      useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN)
          }
        })
        return () => listener()
      }, [firebase, history])
      return condition(authUser) ? <Component {...props} /> : null
    }
    return EnhancedComponent
  }
}

export { withAuthorization }
