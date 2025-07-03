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
    
    return response
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
    const response = await axios.get(`${url}/${id}`, 
        getToken() && {
            headers:{
                Authorization: `Bearer ${getToken()}`
            }
        })

    return response.data
}

const patchListing = async (id, data) => {

    const response = await axios.patch(`${url}/update/${id}`, data, {
        headers:{
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    })

    return response
}

const toggleActive = async (listing) => {
    const data = {
        isActive: !listing.isActive
    }
  
    const response = await axios.patch(`${url}/update/${listing.id}`, data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.status
}

const getListingsSortedByCreatedAt = async (pageNo = 0, pageSize = 6) => {
    const response = await axios.get(`${url}/page/home?pageNo=0&pageSize=6&sortBy=createdAt&sortDirection=DESC&isActive=false`)

    return response.data
}

const getFavoriteFilters = async (pageNo = 0, pageSize = 10) => {
    const response = await axios.get(`${url}/favorite/filters?pageNo=${pageNo}&pageSize=${pageSize}`,{
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response.data

}


export default { createListing, deleteListing, getListingById, patchListing, toggleActive, getListingsSortedByCreatedAt, getFavoriteFilters}