import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='center'>
        <NavLink className="nav_link" to="/">Home</NavLink>
        <NavLink className="nav_link" to="/about">About</NavLink>
        <NavLink className="nav_link" to="/register">Register</NavLink>
        <NavLink className="nav_link" to="/login">Login</NavLink>
      </nav>
  )
}

export default NavBar