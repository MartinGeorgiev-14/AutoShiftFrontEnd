import axios from "axios"

const token = JSON.parse(localStorage.getItem('persist:user'))
const url = "/api/auth"

const login = async (data) => {
    const response = await axios.post(`${url}/login`, data)
    return response.data

}

const register = async (data) => {
    const response = await axios.post(`${url}/register`, data)
    return response
}

const getUserInfo = async () => {
    const updated = token.accessToken.slice(1, token.accessToken.length - 1)

    const response = await axios.post(`${url}/getUserInfo`, null, {
        headers: {
            Authorization: `Bearer ${updated}`,
            'Content-Type': 'application/json',
        }
    })

    return response
}


export default { login, register, getUserInfo } 