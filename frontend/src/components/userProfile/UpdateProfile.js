import { useEffect, useState } from "react"
import { useUpdateProfileMutation } from "../../redux/api/userApi"

import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"
import toast from 'react-hot-toast';
import Userlayout from "../layout/Userlayout";



function UpdateProfile() {
 
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  
  let navigate = useNavigate()

   let [updateProfile, {isLoading, error, isSuccess} ] = useUpdateProfileMutation() 
  
  let { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    if (user) {
      setName(user?.name)
      setEmail(user?.email)
    }
    if (error) {
      toast.error(error?.data?.message)
    }

    if (isSuccess) {
      console.log('updated')
      toast.success("user updated")
      navigate('/user/profile')
      
    }
  }, [user, error, isSuccess])

  let handleUpdateProfile = (e) => {
    e.preventDefault()
    let userData = {
      name,
      email
    }
    updateProfile(userData)
  }
  

  return (
    <Userlayout>
      <div div className = 'row m-5' >
        <h4 style={{textAlign:"center"}}>Update profile</h4>
      <div className='d-flex justify-content-center'>
        <div className='col-4 m-3 border border-2 p-4 w-100'>
        <form onSubmit={handleUpdateProfile}>
            <div>
              <label htmlFor="" className='form-label'>Name</label>
              <input
                type="text"
                className='form-control'
                name='name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="" className='form-label'>Email</label>
              <input
                type="email"
                className='form-control'
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
         
             <button className='btn btn-primary w-100 mt-3' type='submit' disabled={isLoading}>
              {isLoading ? "updating" : "Update"}
          </button>
          </form>
        </div>
      </div>
      </div>  
   </Userlayout>
    
    
  )
    
   
}

export default UpdateProfile