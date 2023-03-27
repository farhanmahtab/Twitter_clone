import Test from '@/components/DummyLogin'
import LogIn from '@/components/LogIn'
import Modal from '@/components/Modal'
import SignUp from '@/components/SignUp'
import { useRouter } from 'next/router'
import React from 'react'

const Git = () => {
  let router = useRouter()
  return (
    <div>
      {/* <a href="http://localhost:3000/api/auth/signout">Sign Out</a>
      <a href="http://localhost:3000/api/auth/signin">Sign In</a> */}
      {router.query.modal == 'signup' && <Modal><SignUp/></Modal>}
      {router.query.modal == 'login' && <Modal><LogIn/></Modal>}
      <Test/>
      
    </div> 
  )
}

export default Git
