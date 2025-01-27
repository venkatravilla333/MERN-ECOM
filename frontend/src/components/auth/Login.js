import React, { useState, useEffect } from 'react'
import { useLoginMutation } from '../../redux/api/authApi'


import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

 let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

 let navigate = useNavigate()

  // console.log(email)
  // console.log(password)

  let [login, { isLoading, error, data }] = useLoginMutation()
  
 let {isAuthenticated} = useSelector((state)=> state.auth)
  
  console.log(data)

  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
    if (error) {
      toast.error(error.data.message)
    }
  }, [error, isAuthenticated])

  
  let handleLoginSubmit = (e) => {
    e.preventDefault()

    let loginData = {
      email,
      password
    }
    login(loginData)
  }
  
 
  
  return (
    <div className='row m-5'>
      <div className='d-flex justify-content-center'>
        <div className='col-4  m-3 border border-2 p-4'>
        <h4 className='my-3'>Login</h4>
        <form onSubmit={handleLoginSubmit}>
          <div>
          <label htmlFor="" className='form-label'>Email</label>
              <input type="email" className='form-control'
                name='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
          </div>
          <div>
          <label htmlFor="" className='form-label'>Password</label>
              <input type="password" className='form-control'
                name='password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
          </div>
          <a href="" className='float-end mt-3'>Forget password</a>
            <button className='btn btn-primary w-100 mt-3' type='submit' disabled={isLoading}>
              {isLoading ? "Authentication.." : "Login"}
          </button>
          <div>
            <Link to="/register" className='float-end mt-3'>New User</Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Login