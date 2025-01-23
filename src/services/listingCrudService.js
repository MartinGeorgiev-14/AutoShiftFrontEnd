import { asyncThunkCreator } from "@reduxjs/toolkit"
import axios from "axios"

const token = JSON.parse(localStorage.getItem('token'))
const url = "http://localhost:8080/api/app"

const createListing = async (data) => {
    

    const response = await axios.post(`${url}/create`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    })

    console.log(response.data)
    return response.data
}

const deleteListing = async (listingId) => {

    const response = await axios.delete(`${url}/delete/${listingId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response.status
}

const getListingById = async (id) => {
    const response = await axios.get(`${url}/${id}`)

    return response.data
}

const patchListing = async (id, data) => {
    const response = await axios.patch(`${url}/update/${id}`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    
    return response.status
}

export default { createListing, deleteListing, getListingById, patchListing }