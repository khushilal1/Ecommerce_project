import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../../services/UserServices'; // Ensure the service is correctly implemented and imported
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';


export const Login = () => {
  const dispatch=useDispatch((state)=>console.log(state))
  const navigate =useNavigate()
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(value); // Pass user data to the service
      const {token,user}=response
      const role=user.isAdmin ? "admin":"user"
      dispatch(login({token,user}))
      navigate(`/dashboard/${role}`)
      setValue({
        email: '',
        password: '',
      });
    } catch (error) {
      toast.error(error.response.data.error || 'An unexpected error occurred');
    }
  };

  return (
    <div className="container center">
      <h1>User Login</h1>
      <ToastContainer />
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={value.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={value.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
