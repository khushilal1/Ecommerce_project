import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = (adminData) => {
  return (
    <div className='sidebar'>
        <h2 className='center'>Admin Profile</h2>
        <div >
        <i className='i.fa-solid fa-user'></i>
          <p>Name: {adminData.adminData.name}</p>
          <p>Email: {adminData.adminData.email}</p>
          <p>Address: {adminData.adminData.address}</p>
        </div>
        <ul className='sidebar_lists'>
            <li className='sidebar_list'>
                <NavLink to='/dashboard/admin/category'>Category</NavLink>
            </li>
            <li className='sidebar_list'>
                <NavLink to='/dashboard/admin/products'>Products</NavLink>
            </li>
            
        </ul>
    </div>
  )
}

export default AdminSidebar