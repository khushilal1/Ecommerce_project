import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import {toast, ToastContainer } from 'react-toastify'
import {accountActivation} from '../services/UserServices'
import { adminAccountActivation } from '../services/AdminServices'

const Activate = () => {
    const {jwtToken}=useParams()
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [token,setToken]=useState("")

    useEffect(()=>{
        const {name}=jwtDecode(jwtToken)
        if(jwtToken){
            setName(name)
            // console.log(jwtToken)
            setToken(jwtToken)
            console.log(token)
            
        }
    },[jwtToken])

    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            console.log(token)
            await adminAccountActivation({token})
            navigate("/login");

        } catch(error){
            toast.error(error.response.data.error)
        }
    }
  return (
    <div>
        <ToastContainer/>
        <div>
            <h1>Hello Admin{name}, Ready to Activate tour Account? </h1>
            <button className='btn btn-primary' type='submit' onClick={handleSubmit}>Activate Account</button>
        </div> 

    </div>
    )
}

export default Activate