import app from 'firebase/app'
import 'firebase/auth'

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
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  doSignOut() {
    return this.auth.signOut()
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email)
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password)
  }
}

export { Firebase }
