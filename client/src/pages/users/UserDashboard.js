import React from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../../assets/ZKZg.gif"
import UserSidebar from '../../components/UserSidebar'

export const UserDashboard = () => {
  const userData=useSelector((state)=>state.user.data.userData)

  return ( userData ?(
  <div className='container-full'>
    <UserSidebar userData={userData}/>
    <div className='main-content'>
      <div className='profile'>
        <div>
          <h2>Hello, {userData.name}</h2>
        </div>
      </div>
    </div>
  </div>  
  ):(
      <img src={loadingGif} className='loading-gif' alt='loadinf git' />
      )
  )
}
