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

const searchCarByCriteria = async (data, pageNo = 0) => {
    const response = await axios.post(`${url}/search?page=${pageNo}&page=10`, data)
    return response.data;
}

const searchCarByUser = async (data, pageNo = 0) => {
    const response = await axios.get(`${url}/page?pageNo=${pageNo}&pageSize=10`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    })

    return response.data;
}

export default { getFormOptions, searchCarByCriteria, searchCarByUser }