import { useSelector, useDispatch } from "react-redux"
import { addChatToBuyList, addChatToSellList, setInitialBuyChatList, setChatSelector } from "../../reducers/chatListReducer"
import { useEffect, useState } from "react"
import chatService from "../../services/chatService"
import ChatsList from "./ChatsList"

const Chat = () => {
    const dispatch = useDispatch()
    // const [buyChatList, setBuyChatList] = useState({})
    // const [sellChatList, setSellChatList] = useState({})
    const buyChatList = useSelector(state => state.chatListReducer.buyList)
    const sellChatList = useSelector(state => state.chatListReducer.sellList)
    const chatSelector = useSelector(state => state.chatListReducer.chatSelector)
    
    useEffect(() => {
        try {
            if (Object.keys(buyChatList).length === 0) {
                chatService.getUserConversations(0, 5, true).then(result => {
                    dispatch(setInitialBuyChatList(result))
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleScroll = (event) => {
        event.preventDefault()

        
    }

    const handleSellChatList = async (event) => {
        try {
            event.preventDefault()
            const result = await chatService.getUserConversations(0, 10, false)
            dispatch(setChatSelector(false))

            if (Object.keys(sellChatList).length === 0) {
                dispatch(addChatToSellList(result))
            }
            // this else block should be moved to the ChatsList component to handle new conversations
            // else {
            //     const conversations = [...sellChatList.response.conversations, ...result.response.conversations]
            //     .sort((a, b) => {
            //         return new Date(b.lastTimeChatted) - new Date(a.lastTimeChatted)
            //     })
            //     setSellChatList({
            //         ...sellChatList,
            //         response: {
            //             ...sellChatList.response,
            //             conversations: [
            //                 ...conversations
            //             ]
            //         }
            //     })
            // }

        } catch (error) {
            console.log(error)
        }
    }

    if (!buyChatList.response) {
        return <div>Loading...</div>
    }



    return (
        <div className="main-container flex-col">
            <h1>Chat</h1>
            <div className="inner-chat-container">
                <div className="chat-container">
                    <div className="type-chat-selector">
                            <button onClick={() => dispatch(setChatSelector(true))} className={`${chatSelector ? 'selected-button' : ''} type-chat-selector-button`}>Buy</button>
                            <button onClick={handleSellChatList} className={`${chatSelector ? '' : 'selected-button'} type-chat-selector-button`}>Sell</button>
                    </div>
                        <ChatsList chats={chatSelector ? buyChatList : sellChatList}
                            setChats={chatSelector ? addChatToBuyList : addChatToSellList}
                            chatSelector={chatSelector}/>
                </div>
                <div>
                    {/* Conversation chat */}
                    <p>chating</p>
                </div>
            </div>
        </div>
    )
}

export default Chat