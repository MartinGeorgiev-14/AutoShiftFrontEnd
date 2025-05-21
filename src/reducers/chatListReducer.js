import { createSlice } from '@reduxjs/toolkit';

const chatListReducer = createSlice({
    name: "chatList",
    initialState: {
        buyList: {},
        sellList: {},
        chatSelector: true
    },
    reducers: {
        addChatToBuyList: (state, action) => {
            if (Object.keys(state.buyList).length === 0) {
                return {
                    ...state,
                    buyList: action.payload
                }
            }
            else {
                const conversations = [...state.buyList.response.conversations, ...action.payload.response.conversations]
                    .sort((a, b) => {
                        return new Date(b.lastTimeChatted) - new Date(a.lastTimeChatted)
                    })
                    
                return({
                    ...state,
                        buyList:{
                        ...state.buyList,
                        response: {
                            ...action.payload.response,
                            conversations: [
                                ...conversations
                            ]
                    }}
                })
            }

        },
        addChatToSellList: (state, action) => {
             if (Object.keys(state.sellList).length === 0) {
                return {
                    ...state,
                    sellList: action.payload
                }
            }
            else {
                const conversations = [...state.sellList.response.conversations, ...action.payload.response.conversations]
                    .sort((a, b) => {
                        return new Date(b.lastTimeChatted) - new Date(a.lastTimeChatted)
                    })
                return({
                    ...state,
                        sellList:{
                        ...state.sellList,
                        response: {
                            ...state.sellList.response,
                            conversations: [
                                ...conversations
                            ]
                    }}
                })
            }
        },
        setInitialBuyChatList: (state, action) => {
            return {
                ...state,
                buyList: action.payload
            }
        },
        setChatSelector: (state, action) => {
            return {
                ...state,
                chatSelector: action.payload
            }
        }
    }
})

export const { addChatToBuyList, addChatToSellList, setInitialBuyChatList, setChatSelector } = chatListReducer.actions
export default chatListReducer.reducer