import React from 'react'
import { NavLink } from 'react-router-dom'

const UserSidebar = (userData) => {
  return (
    <div className='sidebar'>
        <h2 className='center'>User Profile</h2>
        <div >
        <i className='i.fa-solid fa-user'></i>
          <p>Name: {userData.userData.name}</p>
          <p>Email: {userData.userData.email}</p>
          <p>Address: {userData.userData.address}</p>
        </div>
        <ul className='sidebar_lists'>
            <li className='sidebar_list'>
                <NavLink to='/dashboard/user/my_profile'>My Profile</NavLink>
            </li>
            <li className='sidebar_list'>
                <NavLink to='/dashboard/user/order_history'>Order History</NavLink>
            </li>
            
        </ul>
    </div>
  )
}

export default UserSidebar