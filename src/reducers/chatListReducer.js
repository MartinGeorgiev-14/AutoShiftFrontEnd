import { createSlice } from '@reduxjs/toolkit';

const chatListReducer = createSlice({
    name: "chatList",
    initialState: {
        buyList: {
            response: {
                conversations: []
            }
        },
        sellList: {
            response: {
                conversations: []
            }
        },
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


                return ({
                    ...state,
                    buyList: {
                        ...state.buyList,
                        response: {
                            ...action.payload.response,
                            conversations: [
                                ...conversations
                            ]
                        }
                    }
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

                return ({
                    ...state,
                    sellList: {
                        ...state.sellList,
                        response: {
                            ...action.payload.response,
                            conversations: [
                                ...conversations
                            ]
                        }
                    }
                })
            }
        },
        setListingFirstBuyPosition: (state, action) => {
            const conversation = state.buyList.response.conversations.find(conversation => conversation.id === action.payload)
            const conversationIndex = state.buyList.response.conversations.indexOf(conversation)
            const conversationList = [...state.buyList.response.conversations]
            conversationList.splice(conversationIndex, 1)
            conversationList.unshift(conversation)

            console.log("conversation", conversation)

            return {
                ...state,
                buyList: {
                    ...state.buyList,
                    response: {
                        ...state.buyList.response,
                        conversations: [
                            ...conversationList
                        ]
                    }
                }
            }
        },
        setListingFirstSellPosition: (state, action) => {
            const conversation = state.sellList.response.conversations.find(conversation => conversation.id === action.payload)
            const conversationIndex = state.sellList.response.conversations.indexOf(conversation)
            const conversationList = [...state.sellList.response.conversations]
            conversationList.splice(conversationIndex, 1)
            conversationList.unshift(conversation)

            return {
                ...state,
                sellList: {
                    ...state.sellList,
                    response: {
                        ...state.sellList.response,
                        conversations: [
                            ...conversationList
                        ]
                    }
                }
            }
        },
        changeIsRead: (state, action) => {
            const updatedData = action.payload.response;
     
            // Clone and update conversation
            const updateConversation = (conv) => {
                if (conv.id !== updatedData.id) return conv;

                return {
                    ...conv,
                    isReadByBuyer: updatedData.isReadByBuyer,
                    isReadBySeller: updatedData.isReadBySeller,
                    newMessageCounterBuyer: updatedData.newMessageCounterBuyer,
                    newMessageCounterSeller: updatedData.newMessageCounterSeller,
                    listingCarDto: {
                        ...conv.listingCarDto,
                    }
                };
            };

            return {
                ...state,
                buyList: {
                    ...state.buyList,
                    response: {
                        ...state.buyList.response,
                        conversations: state.buyList.response.conversations.map(updateConversation),
                    }
                },
                sellList: {
                    ...state.sellList,
                    response: {
                        ...state.sellList.response,
                        conversations: state.sellList.response.conversations.map(updateConversation),
                    }
                }
            };
        },

        //  ...state.response,
        //         isReadByBuyer: action.payload.response.isReadByBuyer,
        //         isReadBySeller: action.payload.response.isReadBySeller,
        //         newMessageCounterBuyer: action.payload.response.newMessagesCounterBuyer,
        //         newMessageCounterSeller: action.payload.response.newMessagesCounterSeller,    
        setInitialBuyChatList: (state, action) => {
            return {
                ...state,
                buyList: action.payload
            }
        },
        setInitialSellChatList: (state, action) => {
            return {
                ...state,
                sellList: action.payload
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

export const { addChatToBuyList, addChatToSellList, setInitialBuyChatList,
    setChatSelector, setListingFirstBuyPosition, setListingFirstSellPosition,
    changeIsRead, setInitialSellChatList } = chatListReducer.actions
export default chatListReducer.reducer