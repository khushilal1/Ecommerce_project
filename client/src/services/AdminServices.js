import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = process.env.REACT_APP_API;

export const createCategory = async ({ name, token }) => {
    console.log("Request URL:", `${baseURL}/categories`);
    console.log("Request Headers:", { Authorization: `Bearer ${token}` });
    console.log("Request Payload:", { name });

    try {
        if (!token) {
            throw new Error("Authorization token is missing.");
        }
        const response = await axios.post(
            `${baseURL}/categories`,
            { name },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return response; // Return only the data part of the response
    } catch (error) {
        console.error("Error creating category:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
};


export const getCategories = async () => {
    try {
        const response = await axios.get(
            `${baseURL}/categories`,
        );
        return response.data; // Return only the data part of the response
    } catch (error) {
        console.error("Error:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
};


export const deleteCategory = async ({ id, token }) => {
    console.log("Request URL:", `${baseURL}/categories`);
    console.log("Request Headers:", { Authorization: `Bearer ${token}` });
    console.log("Request Payload:", { id });

    try {
        
        const response = await axios.delete(
            `${baseURL}/categories/${id}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        return response; // Return only the data part of the response
    } catch (error) {
        console.error("Error creating category:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
};
