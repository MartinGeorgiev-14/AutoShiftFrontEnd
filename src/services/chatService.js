import axios from "axios"
import { store } from "../configure/configureStore"

const url = "/api/chats"

const getToken = () => {
    const state = store.getState()
    return state.user.accessToken
}

const getUserConversations = async (pageNo = 0, pageSize = 10, whatUser = true) => {
    const token = getToken();
    const data = {
        whatUser
    }

    const repsonse = await axios.post(`${url}/user/conversations?pageNo=${pageNo}&pageSize=${pageSize}`, data, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return repsonse.data
}

export default { getUserConversations } 