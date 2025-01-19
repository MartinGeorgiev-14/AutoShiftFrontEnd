import axios from "axios"

const url = "http://localhost:8080/api/auth"

const login = async (data) => {
    const response = await axios.post(`${url}/login`, data)
    return response.data

}

const register = async (data) => {
    const response = await axios.post(`${url}/register`, data)
    return response.data
}

const getUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const response = await axios.post(`${url}/getUserInfo`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if(response.data.accessToken){
       return response.data
    }

    return false
 
}


export default { login, register, getUserInfo } 