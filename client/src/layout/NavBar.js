import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/userSlice'

const NavBar = () => {
  const data=useSelector((state)=>state.user.data)
  const isAdmin= data?.userData?.isAdmin
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=()=>{
    dispatch(logout())
    navigate("/login",{replace:true})
  }
  return (
    <nav className='center'>
        <NavLink className="nav_link" to="/">Home</NavLink>
        <NavLink className="nav_link" to="/about">About</NavLink>
        {!data.isLoggedIn &&(
          <>
            <NavLink className="nav_link" to="/register">Register</NavLink>
            <NavLink className="nav_link" to="/adminregister">AdminRegister</NavLink>
            <NavLink className="nav_link" to="/login">Login</NavLink>
          </>
        )}
        {data.isLoggedIn &&(
          <div className='drop'>
            <button className='dropbtn'>{data.userData.name}</button>
            <ul className='dropdown-content'>
              <li>
              <NavLink className="nav_link" to="/logout" onClick={handleLogout}>Logout</NavLink>

              </li>
              <li>
                <NavLink className="nav_link" to={ `dashboard/${isAdmin===1 ? "admin":"user"}`} onClick={handleLogout}>Dashboard</NavLink>
              </li>
            </ul>
          </div>
        )}
    </nav>
  )
}

export default NavBar