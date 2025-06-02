import axios from "axios"
import { store } from "../configure/configureStore"

const url = "/api/chats"

const getToken = () => {
    const state = store.getState()
    return state.user.accessToken
}

const getUserConversations = async (pageNo = 0, pageSize = 5, whatUser = true) => {
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

const getUserChatMesages = async (pageNo = 0, pageSize = 5, conversationId) => {
    const token = getToken()
    console.log("pageNo", pageNo)
    const response = await axios.get(`${url}/conversations/${conversationId}/messages?pageNo=${pageNo}&pageSize=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`    
        }
    })

    return response.data
}

const getConversationById = async (conversationId) => {
    const token = getToken()

    const response = await axios.get(`${url}/conversations/get/${conversationId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

const createConversation = async (id) => {
    const response = await axios.post(`${url}/conversations/${id}`)
}

export default { getUserConversations, getUserChatMesages, getConversationById } 