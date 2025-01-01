import React from 'react'
import {  useNavigate } from 'react-router-dom'

export const Error = ({ message = "404! Page not found" }) => {
  const navigate = useNavigate();

  return (
    <div className="error center">
      <h2 className="error-page">{message}</h2>
      <button
        className="btn"
        onClick={() => navigate('/', { replace: true })}
      >
        Go to Home Page
      </button>
    </div>
  );
};
