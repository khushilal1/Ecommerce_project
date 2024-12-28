import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home, About, Register, Login,Error, Dashboard} from '../pages'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import Activate from '../components/Activate'
import Protected from "./ProtectRoutes"

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
            <Route path="" element={<Dashboard/>} />
          </Route> 
          <Route path="/auth/activate/:jwtToken" element={<Activate/>} /> 
          <Route path="*" element={<Error/>} /> 
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default Index