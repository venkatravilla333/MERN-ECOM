import React from 'react'
import { useSelector } from 'react-redux'

import {Navigate} from 'react-router-dom'

function ProtectedRoutes({ children }) {
  let { isAuthenticated } = useSelector(state => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }
  return (
    children
  )
}

export default ProtectedRoutes