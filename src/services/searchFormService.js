import axios from "axios";

const url = "http://localhost:8080/api/app"

const getFormOptions = async () => {
    const response = await axios.get(`${url}/options`)
    return response.data;
}

const searchCarByCriteria = async (data, pageNo = 0) => {
    const response = await axios.post(`${url}/search?pageNo=${pageNo}&pageSize=10`, data)
    return response.data;
}

export default { getFormOptions, searchCarByCriteria }