import { asyncThunkCreator } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { store } from "../configure/configureStore"
import axios from "axios"

const token = JSON.parse(localStorage.getItem('persist:user'))
const url = "/api/app"

const getToken = () => {
    const state = store.getState()
    return state.user.accessToken
}

const createListing = async (data) => {
    

    const response = await axios.post(`${url}/create`, data, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            "Content-Type": "multipart/form-data"
        }
    })
    
    return response.status
}

const deleteListing = async (listingId) => {

    const response = await axios.delete(`${url}/delete/${listingId}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
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
            Authorization: `Bearer ${getToken()}`
        }
    })

    
    return response.status
}



export default { createListing, deleteListing, getListingById, patchListing }