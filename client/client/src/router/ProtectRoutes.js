import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Home } from '../pages'

const Protected = () => {
    const isLoggedIn =useSelector((state)=>state.user.data.isLoggedIn)

    
  return (
    isLoggedIn ? <Outlet/>:<Home/>
  )
}

export default Protected