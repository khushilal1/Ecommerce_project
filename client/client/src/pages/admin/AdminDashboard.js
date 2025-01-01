import React from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../../assets/ZKZg.gif"
import AdminSidebar from '../../components/AdminSidebar'

export const AdminDashboard = () => {
  const adminData=useSelector((state)=>state.user.data.userData)

  return ( adminData ?(
  <div className='container-full'>
    <AdminSidebar adminData={adminData}/>
    <div className='main-content'>
      <div className='profile'>
        <div>
          <h2>Hello, {adminData.name}</h2>
        </div>
      </div>

    </div>

  </div>  
  ):(
      <img src={loadingGif} className='loading-gif' alt='loadinf git' />
      )
  )
}
