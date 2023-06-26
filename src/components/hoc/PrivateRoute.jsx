import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function PrivateRoute({ children }) {
  let isAuth = useSelector(store => store.user.status)
  
    if (!isAuth) {
      return <Navigate to="/login" />;
    }

  return children
}
