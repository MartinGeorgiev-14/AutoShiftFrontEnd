import { useSelector, useDispatch } from "react-redux"
import { addChatToBuyList, addChatToSellList, setInitialBuyChatList, setChatSelector, setListingFirstBuyPosition, setListingFirstSellPosition , changeIsRead } from "../../reducers/chatListReducer"
import { useEffect, useState, useRef } from "react"
import chatService from "../../services/chatService"
import ChatsList from "./ChatsList"
import Conversation from "./Conversation"

const Chat = () => {
    const dispatch = useDispatch()
    // const [buyChatList, setBuyChatList] = useState({})
    // const [sellChatList, setSellChatList] = useState({})
    const buyChatList = useSelector(state => state.chatListReducer.buyList)
    const sellChatList = useSelector(state => state.chatListReducer.sellList)
    const chatSelector = useSelector(state => state.chatListReducer.chatSelector)
    const [conversation, setConversation] = useState(null)
    const chatList = useSelector(state => state.chatListReducer)

    console.log("chatList", chatList)   

    useEffect(() => {
        try {
                chatService.getUserConversations(0, 5, true).then(result => {
                    dispatch(setInitialBuyChatList(result))
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleSellChatList = async (event) => {
        try {
            event.preventDefault()
            const result = await chatService.getUserConversations(0, 10, false)
            dispatch(setChatSelector(false))
            dispatch(addChatToSellList(result))
            
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
                            chatSelector={chatSelector}
                            setConversation={setConversation}/>
                </div>
                <Conversation conversation={conversation}
                conversationUpdater={chatSelector ? setListingFirstBuyPosition : setListingFirstSellPosition}
                conversationGetter={chatSelector ? buyChatList : sellChatList}
                changeIsRead={changeIsRead}/>
            </div>
        </div>
    )
}

export default Chat