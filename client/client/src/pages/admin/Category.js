import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../../assets/ZKZg.gif"
import AdminSidebar from '../../components/AdminSidebar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory } from '../../services/AdminServices';

export const Category = () => {
  const adminData=useSelector((state)=>state.user.data.userData)
  const token=useSelector((state)=>state.user.data.token)
  console.log(token)
  const [name,setName]=useState()
  // Handle input changes
  const handleInputChange = (event) => {
    setName(event.target.value)
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {data}=await createCategory({name,token})
      console.log(data)
    } catch (error) {
      toast.error(error.response.data.error || 'An unexpected error occurred');
    }
  
  };

  return ( adminData ?(
  <div className='container-full'>
    <AdminSidebar adminData={adminData}/>
    <div className='main-content'>
      <div className='profile'>
        <div>
          <h2>Category Page</h2>
          <ToastContainer />
            <div className="card">
                <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Name</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                <div className="form-control">
                    <button type="submit" className="btn">
                        Create Category
                    </button>
                </div>
                </form>
            </div>
        </div>
      </div>

    </div>

  </div>  
  ):(
      <img src={loadingGif} className='loading-gif' alt='loadinf git' />
      )
  )
}
