import React from 'react'
import Userlayout from '../layout/Userlayout'
import { useSelector } from 'react-redux'

function Profile() {
 let {user} = useSelector((state)=> state.auth)
  return (
    <Userlayout>
      <div className='row profile'>
        <h4>User profile</h4>
        
        <div className='mt-4'>
          <h5>Fullname: {user?.name}</h5>
          <h5 className='my-4'>Email: {user?.email}</h5>
          <h5>Joined On: {user?.createdAt?.slice(0, 10)}</h5>
          </div>
          </div>
     
    </Userlayout>
  )
}

export default Profile