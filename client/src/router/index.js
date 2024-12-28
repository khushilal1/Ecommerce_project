import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home, About, Register, Login,Error, UserDashboard, AdminDashboard} from '../pages'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import Activate from '../components/Activate'
import Protected from "./ProtectRoutes"
import AdminRoutes from './AdminRoutes'

const Index = () => {
  return (
    <BrowserRouter>
    <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/about" element={<About/>} /> 
          <Route path="/register" element={<Register/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/dashboard" element={<Protected/>} >
            <Route path="user" element={<UserDashboard/>} />
          </Route>
          <Route path="/dashboard" element={<AdminRoutes/>} >
            <Route path="admin" element={<AdminDashboard/>} />
          </Route> 
          
          <Route path="/auth/activate/:jwtToken" element={<Activate/>} /> 
          <Route path="*" element={<Home/>} /> 
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default Index