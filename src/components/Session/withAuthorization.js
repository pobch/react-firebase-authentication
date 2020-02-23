import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import * as ROUTES from '../../constants/routes'

function withAuthorization(condition) {
  return function(Component) {
    function EnhancedComponent(props) {
      const firebase = useContext(FirebaseContext)
      const history = useHistory()
      useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(authUser => {
          if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN)
          }
        })
        return () => listener()
      }, [firebase, history])
      return <Component {...props} />
    }
    return EnhancedComponent
  }
}

export { withAuthorization }
