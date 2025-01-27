import React, { useEffect } from 'react';
import '../../app.css';
import { useGetUserQuery } from '../../redux/api/userApi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery, useLogoutQuery } from '../../redux/api/authApi';
import toast from 'react-hot-toast'; // For toast notifications

function Header() {
  const navigate = useNavigate();
  
  const [logout, {data}] = useLazyLogoutQuery(); // Lazy logout query
  console.log('logout', data)
  
  const { user, isAuthenticated} = useSelector((state) => state.auth); // User from Redux state
  const { isLoading, isError, error } = useGetUserQuery(null, { skip: !isAuthenticated }); // Fetch user data only when authenticated
  
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Error fetching user data');
    }
  }, [isError, error]);

  const logoutHandler = async () => {
    try {
      await logout(); // Perform logout
      console.log('hi')
      navigate(0); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed. Please try again');
    }
  };

  return (
    <header className='header'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3" data-bs-theme="dark">
      <div className="container-fluid d-flex align-items-center">
        {/* Store Name */}
        <Link className="navbar-brand fw-bold" to="/">
          Reyan Store
        </Link>

        {/* Search Bar */}
        <div className="input-group w-50 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search Products"
            aria-label="Search Products"
          />
          <button className="btn btn-success" type="button">
            Search
          </button>
        </div>

        
        <ul className="navbar-nav ms-auto d-flex align-items-center">
         
          <li className="nav-item me-3">
            <Link className="nav-link" to="/cart">
              Cart
            </Link>
          </li>

          {/* User Authentication */}
          {isLoading ? (
            <li className="nav-item">
              <span className="nav-link">Loading...</span> {/* Show loading state */}
            </li>
          ) : user ? (
            // If the user is logged in, show the dropdown menu
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name || 'User'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/me/orders">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            // If the user is not logged in, show the login link
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
    </header>
    
  );
}

export default Header;
