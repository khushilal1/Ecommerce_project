import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const registerAdmin = async (user) => {
    console.log(baseURL)
    const response = await axios.post(`${baseURL}/admin/register`, user)
    return response.data
}
export const adminAccountActivation=async(data)=>{
    const response=await axios.post(`${baseURL}/admin/account-activation`,data)
    return response.data
}


export const createCategory = async ({ name, token }) => {
    if (!token) {
        throw new Error("Authorization token is missing.");
    }
    console.log("Request URL:", `${baseURL}/categories`);
    console.log(token);
    console.log("Request Payload:", { name });

    try {
        const response = await axios.post(
            `${baseURL}/categories`,
            { name },
            {
                headers: {
                    Authorization: token
                },
            }
        );

        return response.data; // Return only the data part of the response
    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
            console.error("Response Status:", error.response.status);
            console.error("Response Headers:", error.response.headers);
        } else {
            console.error("Error Message:", error.message);
        }
        throw error; // Re-throw the error for the caller to handle
    }
};
