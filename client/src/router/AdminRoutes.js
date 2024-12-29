import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import {  Login } from '../pages'

const AdminRoutes = () => {
    const isAdmin=useSelector((state)=>state.user.data.userData.isAdmin)
    console.log(isAdmin)
    const isLoggedIn =useSelector((state)=>state.user.data.isLoggedIn)

  return (
    isLoggedIn && isAdmin? <Outlet/>:<Login/>
  )
}

export default AdminRoutes