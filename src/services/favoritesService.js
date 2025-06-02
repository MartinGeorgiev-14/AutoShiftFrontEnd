import { IoArrowForwardCircleOutline } from "react-icons/io5"
import { store } from "../configure/configureStore"
import axios from "axios"
import { add } from "lodash"

const url = "/api/app"

const getToken = () => {
    const state = store.getState()
    return state.user.accessToken
}

const getFavoriteFilters = async (pageNo = 0, pageSize = 10) => {
    const response = await axios.get(`${url}/favorite/filters?pageNo=${pageNo}&pageSize=${pageSize}`,{
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response.data

}

const addFilterToFavorites = async (data) => {
    const response = await axios.post(`${url}/favorite/filters/add`, data, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const getFavoriteListings = async (pageNo = 0, pageSize = 10) => {
    const response = await axios.get(`${url}/favorite/listings?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const addListingToFavorites = async (id) => {
    const response = await axios.post(`${url}/favorite/listing/add/${id}`, {}, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const removeListingFromFavorites = async (id) => {
    const response = await axios.delete(`${url}/favorite/listing/remove/${id}`, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const changeNotify = async (id) => {
    const response = await axios.patch(`${url}/favorite/filters/change/notify/${id}`, {}, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const changeNotifyListing = async (id) => {
    const response = await axios.patch(`${url}/favorite/listing/change/notify/${id}`, {}, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

const removeFilterFromFavorites = async (id) => {
    const response = await axios.delete(`${url}/favorite/filters/remove/${id}`, {
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })

    return response
}

export default { getFavoriteFilters, addFilterToFavorites, addListingToFavorites,
    removeListingFromFavorites, changeNotify, removeFilterFromFavorites, getFavoriteListings, changeNotifyListing} 