import React from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../assets/ZKZg.gif"

export const Dashboard = () => {
  const {userData}=useSelector((state)=>state.user.data)
  console.log(userData)
  return ( userData ?(
    <div className='profile'>
      <h2>User Profile</h2>
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Address: {userData.address}</p>
      </div>
    </div>):(
      <img src={loadingGif} className='loading-gif' alt='loadinf git' />
      )
  )
}
