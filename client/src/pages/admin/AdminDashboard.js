import React from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../../assets/ZKZg.gif"

export const AdminDashboard = () => {
  const adminData=useSelector((state)=>state.user.data.userData)

  return ( adminData ?(
    <div className='profile'>
      <h2>Admin Profile</h2>
      <div>
        <p>Name: {adminData.name}</p>
        <p>Email: {adminData.email}</p>
        <p>Address: {adminData.address}</p>
      </div>
    </div>):(
      <img src={loadingGif} className='loading-gif' alt='loadinf git' />
      )
  )
}
