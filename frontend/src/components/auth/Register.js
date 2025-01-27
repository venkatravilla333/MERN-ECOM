import React, { useState, useEffect } from 'react'
import { useRegisterMutation } from '../../redux/api/authApi'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  let { name, email, password } = user;

  let [register, { isLoading, error, data }] = useRegisterMutation();
  
  const navigate = useNavigate();  // Initialize navigate function

  let handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(user);
    navigate('/')
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    // If registration is successful, redirect to home page
    // if (data?.success) {
    //   toast.success('Registration successful!');
    //   navigate('/');  // Navigate to the home page
    // }
  }, [error]);

  let handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='row m-5'>
      <div className='d-flex justify-content-center'>
        <div className='col-4 m-3 border border-2 p-4'>
          <h4 className='my-3'>Register</h4>
          <form onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="" className='form-label'>Name</label>
              <input
                type="text"
                className='form-control'
                name='name'
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className='form-label'>Email</label>
              <input
                type="email"
                className='form-control'
                name='email'
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className='form-label'>Password</label>
              <input
                type="password"
                className='form-control'
                name='password'
                value={password}
                onChange={handleChange}
              />
            </div>
            <button className='btn btn-primary w-100 mt-3' type='submit' disabled={isLoading}>
              {isLoading ? "User creating in db" : "Register"}
            </button>
            <div>
              <Link to="/login" className='float-end mt-3'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
