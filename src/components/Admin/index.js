import React, { useEffect, useContext, useState } from 'react'
import { FirebaseContext } from '../Firebase'

function AdminPage() {
  const [state, setState] = useState({ users: [], loading: false })
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    setState(prev => ({ ...prev, loading: true }))
    firebase.users().on('value', snapshot => {
      const userObj = snapshot.val()
      const userList = Object.keys(userObj).map(key => {
        return {
          ...userObj[key],
          uid: key
        }
      })
      setState(prev => ({
        ...prev,
        users: userList,
        loading: false
      }))
    })
    return () => firebase.users().off()
  }, [firebase])

  return (
    <div>
      <h1>Admin Page</h1>
      {state.loading && <div>Loading...</div>}
      <UserList users={state.users} />
    </div>
  )
}

function UserList(props) {
  return (
    <ul>
      {props.users.map(user => {
        return (
          <li key={user.uid}>
            <span>
              <strong>ID :</strong> {user.uid}
            </span>
            <span>
              <strong>E-mail :</strong> {user.email}
            </span>
            <span>
              <strong>Username :</strong> {user.username}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default AdminPage
