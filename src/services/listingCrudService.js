import { asyncThunkCreator } from "@reduxjs/toolkit"
import axios from "axios"

const url = "http://localhost:8080/api/app"

const createListing = async (data, images) => {
    const token = JSON.parse(localStorage.getItem('token'))

    console.log(token, data, images)
   
    const formattedData = {
        ...data,
        uploadImages: images    
    }

    console.log(formattedData)

    const response = await axios.post(`${url}/create`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })

    console.log(response.data)
}

export default { createListing }