import axios from "axios"
require("dotenv").config()

const baseURL = process.env.REACT_APP_API
console.log(baseURL)

export const registerUser = async (user) => {
    console.log(baseURL)
    const response = await axios.post(`${baseURL}/register`, user)
    return response.data
}

// export const registerActivation=async(data)=>{
//     const response=await axios.post(`${baseURL}/account-activation`,data)
//     return response.data
// }

// export const loginUser=async(user)=>{
//     const response=await axios.post(`${baseURL}/login`,user)
//     return response.data
// }

// export const userProfile=async()=>{
//     const response=await axios.get(`${baseURL}/profile`,{
//         withCredentials:true
//     })
//     return response.data
// }

// export const authorizeUser=async (token)=>{
//     const response=await axios.get(
//         `${baseURL}/auth-check`,
//         {
//             headers:{
//                 Authorization:token
//             }
//         }
//     )
//     return response
// }

// export const logoutUser=async()=>{
//     const response=await axios.post(`${baseURL}/logout`,null,{
//         withCredentials:true,
//     })
//     return response.data
// }