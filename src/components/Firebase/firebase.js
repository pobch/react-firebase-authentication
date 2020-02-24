import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const configs = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
  constructor() {
    app.initializeApp(configs)
    this.auth = app.auth()
    this.db = app.database()
  }

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut = () => {
    return this.auth.signOut()
  }

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email)
  }

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  user = uid => {
    return this.db.ref(`users/${uid}`)
  }

  users = () => {
    return this.db.ref('users')
  }

  onAuthUserListener = (next, fallback) => {
    // return function to unsubscribe
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // fetch additional data from db service
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val()
            // create `roles` if there is not any
            if (!dbUser.roles) {
              dbUser.roles = {}
            }
            // merge data from 2 services: auth and db
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            }
            // call callback function with `authUser` as an argument
            next(authUser)
          })
      } else {
        fallback()
      }
    })
  }
}

export { Firebase }
