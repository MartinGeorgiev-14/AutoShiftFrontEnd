import axios from "axios";
import { store } from "../configure/configureStore";

const url = "/api/app"

const getToken = () => {
    const state = store.getState()
    return state.user.accessToken
}

const getFormOptions = async () => {
    const response = await axios.get(`${url}/options`)
    return response.data;
}

const searchCarByCriteria = async (data, pageNo = 0, pageSize = 10) => {
    const response = await axios.post(`${url}/search?pageNo=${pageNo}&pageSize=${pageSize}`, data)
    return response.data;
}

const searchCarByUser = async (data, pageNo = 0, pageSize = 10, sortBy = "price", sortDirection = "ASC") => {
    const response = await axios.get(`${url}/page?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })

    return response.data;
}

export default { getFormOptions, searchCarByCriteria, searchCarByUser }