import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import chatService from "../../services/chatService"
import ConversationTop from "./ConversationTop"
import ConversationBottom from "./ConversationBottom"
import ConversationMiddle from "./ConversationMiddle"

const Conversation = ({ conversationId }) => {
    const user = useSelector(state => state.user)
    const conRef = useRef(null)
    const [inputValue, setInputValue] = useState("")
    const [conData, setConData] = useState({})
    const [messages, setMessages] = useState({})

    useEffect(() => {

        if (conversationId !== null) {
            try {
                chatService.getConversationById(conversationId).then(result => {
                    setConData(result)
                })
                chatService.getUserChatMesages(0, 5, conversationId).then(result => {
                    setMessages(result.response)
                })
            } catch (error) {
                console.log(error)
            }

            const socket = () => new SockJS("http://localhost:8080/ws-chat?token=" + user.accessToken)
            let stompClient = Stomp.over(socket)
            stompClient.debug = () => { }

            stompClient.connect(
                { Authorization: `Bearer ${user.accessToken}` },
                () => {
                    console.log("Connected to WebSocket")
                    stompClient.subscribe(`/topic/chat/${conversationId}`, (message) => {
                        const body = JSON.parse(message.body)
                        console.log("Received message: ", body)
                        // setMessage
                    })
                },
                (error) => {
                    console.log("Error connecting to WebSocket: ", error)
                }
            )

            conRef.current = conversationId
        }
    }, [conversationId])

    if (!conversationId) {
        return <div>Select a conversation to view</div>
    }
    
    return (
        <div className="conversation-container">
                <ConversationTop data={conData} />
                <ConversationMiddle messages={messages} setMessages={setMessages} conData={conData}/>
                <hr className="lg:text-divider-component"></hr>
                <ConversationBottom inputValue={inputValue} setInputValue={setInputValue}/>
        </div>
    )
}

export default Conversation