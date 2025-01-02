import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { registerAdmin } from '../../services/AdminServices';

export const AdminRegister = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Optional: Validate input
    if (user.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      console.log(user)
      const response = await registerAdmin(user); // Pass user data to the service
      toast.success(response.message || 'Registration successful');
      setUser({
        name: '',
        email: '',
        password: '',
        address: '',
      });
    } catch (error) {
      toast.error(error.response.data.error || 'An unexpected error occurred');
    }
  };

  return (
    <div className="container center">
      <h1>Admin Registration</h1>
      <ToastContainer />
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-control">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
