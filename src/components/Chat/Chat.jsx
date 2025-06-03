import { useSelector, useDispatch } from "react-redux"
import { addChatToBuyList, addChatToSellList, setInitialBuyChatList, setChatSelector, setListingFirstBuyPosition, setListingFirstSellPosition, changeIsRead } from "../../reducers/chatListReducer"
import { useEffect, useState, useRef } from "react"
import chatService from "../../services/chatService"
import ChatsList from "./ChatsList"
import Conversation from "./Conversation"
import { displayNotification } from "../../reducers/notificationReducer"
import { useParams } from "react-router"

const Chat = () => {
    const dispatch = useDispatch()
    // const [buyChatList, setBuyChatList] = useState({})
    // const [sellChatList, setSellChatList] = useState({})
    const { id } = useParams()
    const buyChatList = useSelector(state => state.chatListReducer.buyList)
    const sellChatList = useSelector(state => state.chatListReducer.sellList)
    const chatSelector = useSelector(state => state.chatListReducer.chatSelector)
    const [conversation, setConversation] = useState(null)
 
    const chatList = useSelector(state => state.chatListReducer)
    console.log('conversation', conversation)
    useEffect(() => {
    const fetchChats = async () => {
        try {
            if (id !== undefined) {

                let conCollector
                let initialChatsHolder = await chatService.getUserConversations(0, 4, true);
                const chatResult = await chatService.createConversation(id);
                const exists = initialChatsHolder.response.conversations.some(c => c.id === chatResult.response.id)

                if(!exists){
                    conCollector = [...initialChatsHolder.response.conversations, chatResult.response]
                }
                else conCollector = [...initialChatsHolder.response.conversations]
                setConversation(chatResult.response)
                
                initialChatsHolder = {
                    ...initialChatsHolder,
                    response: {
                        ...initialChatsHolder.response,
                        conversations: [...conCollector]
                    }
                };
             
                dispatch(setInitialBuyChatList(initialChatsHolder));
            } else {
                const result = await chatService.getUserConversations(0, 5, true);
                dispatch(setInitialBuyChatList(result));
            }
        } catch (error) {
        }
    };

    fetchChats();
}, [id]);

    const handleSellChatList = async (event) => {
        try {
            event.preventDefault()
            const result = await chatService.getUserConversations(0, 10, false)
            dispatch(setChatSelector(false))
            dispatch(addChatToSellList(result))

        } catch (error) {
            dispatch(displayNotification({ type: "error", message: "Error fetching sell chat list" }))
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
                        setConversation={setConversation}
                        conversation={conversation} />
                </div>
                <Conversation conversation={conversation}
                    conversationUpdater={chatSelector ? setListingFirstBuyPosition : setListingFirstSellPosition}
                    conversationGetter={chatSelector ? buyChatList : sellChatList}
                    changeIsRead={changeIsRead} />
            </div>
        </div>
    )
}

export default Chat