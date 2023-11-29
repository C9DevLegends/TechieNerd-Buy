import React from 'react'
import useAuth from '../Custom-hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const RotectedRoute = () => {
    const {currentUser} = useAuth()

  return currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default RotectedRoute
