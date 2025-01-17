import axios from "axios";

const url = "http://localhost:8080/api/app"

const getFormOptions = async () => {
    const response = await axios.get(`${url}/options`)
    return response.data;
}

export default { getFormOptions }