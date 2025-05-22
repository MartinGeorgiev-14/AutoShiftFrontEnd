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
    const stompClient = useRef(null)
    const [newMessageLoad, setNewMessageLoad] = useState(false)

    useEffect(() => {

        if (conversationId !== null) {
            try {
                chatService.getConversationById(conversationId).then(result => {
                    setConData(result)
                })
                chatService.getUserChatMesages(0, 5, conversationId).then(result => {
                    setMessages({
                        ...result.response,
                        messages: result.response.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                    })
                })
            } catch (error) {
                console.log(error)
            }

            const socket = () => new SockJS("http://localhost:8080/ws-chat?token=" + user.accessToken)
            stompClient.current = Stomp.over(socket())

            stompClient.current.debug = () => { }

            stompClient.current.connect(
                { Authorization: `Bearer ${user.accessToken}` },
                () => {
                    console.log("Connected to WebSocket")
                    stompClient.current.subscribe(`/topic/chat/${conversationId}`, (message) => {
                        const body = JSON.parse(message.body)
                        console.log("Received message: ", body)

                        if (body.type === "message"){
                            setMessages(prev => ({
                                ...prev,
                                messages: [...prev.messages, body.response].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                            }))
                            setNewMessageLoad(true)
                        }
                    })
                },
                (error) => {
                    console.log("Error connecting to WebSocket: ", error)
                }
            )


            conRef.current = conversationId
        }
    }, [conversationId])

    const handleSendMessage = () => {
        if (!inputValue.trim()) return

        const message = {
            sender: user.username,
            content: inputValue,
            conversationId: conversationId,
            timestamp: new Date().toISOString(),
        }
        console.log("stompClient", stompClient)
        const test = stompClient.current.send('/app/chat/' + conversationId + '/send', {}, JSON.stringify(message))
        setInputValue('')
    }

    if (!conversationId) {
        return <div>Select a conversation to view</div>
    }
   
    return (
        <div className="conversation-container">
            <ConversationTop data={conData} />
            <ConversationMiddle messages={messages} setMessages={setMessages} conData={conData} newMessageLoad={newMessageLoad} setNewMessageLoad={setNewMessageLoad}/>
            <hr className="lg:text-divider-component"></hr>
            <ConversationBottom inputValue={inputValue} setInputValue={setInputValue} handleSendMessage={handleSendMessage} />
        </div>
    )
}

export default Conversation