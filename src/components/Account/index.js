import React, { useContext } from 'react'
import PasswordChangeForm from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'
import { AuthUserContext } from '../Session'

function AccountPage() {
  const authUser = useContext(AuthUserContext)
  return (
    <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  )
}

export default AccountPage
