import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home, About, Register, Login,Error} from '../pages'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import Activate from '../components/Activate'


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
          <Route path="/auth/activate/:jwtToken" element={<Activate/>} /> 
          <Route path="*" element={<Error/>} /> 
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default Index