import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loadingGif from "../../assets/ZKZg.gif"
import AdminSidebar from '../../components/AdminSidebar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory, deleteCategory, getCategories } from '../../services/AdminServices';
import { all } from 'axios';

export const Category = () => {
  const adminData=useSelector((state)=>state.user.data.userData)
  const token=useSelector((state)=>state.user.data.token)

  const [categories,setCategories]=useState([])
  const [name,setName]=useState()
  
  const fetchCategories = async () => {

    try {
      const response = await getCategories();
      console.log('Fetched Categories Response:', response); // Log the response
      const { allCategries } = response; // Adjust if the structure is different
      setCategories(allCategries);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error(error?.response?.data?.error || "Failed to fetch categories");
    } 
  };
  


  useEffect(()=>{
    fetchCategories()
  },[])
  // Handle input changes
  const handleInputChange = (event) => {
    setName(event.target.value)
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {data}=await createCategory({name,token})
      toast.success(data.message)
      fetchCategories()
    } catch (error) {
      toast.error(error.response.data.error);
    }
  
  };

  const handleDelete = async (id) => {
    console.log('Deleting category with id:', id);
    try {
      const response = await deleteCategory({ id, token })
      fetchCategories()
      toast.success(response.data.message);
      } 
    catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch categories");
    } 
  }


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
            <div className="categories">
              <h2>Categories:</h2>
              <ul>
                {categories && categories.map((category) => (
                  <li key={category._id}>
                    <span className="category-name">{category.name}</span>
                    <div className="actions">
                      <button
                        className="update-btn"
                        
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(category._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
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
