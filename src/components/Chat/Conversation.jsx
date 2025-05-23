import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import chatService from "../../services/chatService"
import ConversationTop from "./ConversationTop"
import ConversationBottom from "./ConversationBottom"
import ConversationMiddle from "./ConversationMiddle"
import { useDispatch } from "react-redux"



const Conversation = ({ conversation, conversationUpdater, conversationGetter, changeIsRead}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const conRef = useRef(null)
    const [inputValue, setInputValue] = useState("")
    const [conData, setConData] = useState({})
    const [messages, setMessages] = useState({})
    const stompClient = useRef(null)
    const [newMessageLoad, setNewMessageLoad] = useState(false)
   


    useEffect(() => {

        if (conversation !== null) {
            try {
                chatService.getUserChatMesages(0, 5, conversation.id).then(result => {
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

            new Promise((resolve, reject) => {
                stompClient.current.connect(
                    { Authorization: `Bearer ${user.accessToken}` },
                    () => {
                        console.log("Connected to WebSocket")
                        stompClient.current.subscribe(`/topic/chat/${conversation.id}`, (message) => {
                            const body = JSON.parse(message.body)
                            console.log("Received message: ", body)

                            if (body.type === "message") {
                                setMessages(prev => ({
                                    ...prev,
                                    messages: [...prev.messages, body.response].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                }))
                                setNewMessageLoad(true)
                                dispatch(conversationUpdater(body.response.conversationId))
                            }else if (body.type === "read"){
                                dispatch(changeIsRead(body))
                            }
                            
                        })

                        resolve()
                    },
                    (error) => {
                        console.log("Error connecting to WebSocket: ", error)
                    }
                )
            }).then(() => {
                console.log("start")
                conversationSeen()
                console.log("end")
            })
            conRef.current = conversation.id
        }
    }, [conversation])

    // useEffect(() => {
    //     if (conRef.current) {
    //         stompClient.current.send('/app/chat/' + conversationId + '/read', {}, JSON.stringify({}))
    //     }
    // }, [stompClient])

    const handleSendMessage = () => {
        if (!inputValue.trim()) return

        const message = {
            sender: user.username,
            content: inputValue,
            conversationId: conversation.id,
            timestamp: new Date().toISOString(),
        }
        console.log("stompClient", stompClient)
        const test = stompClient.current.send('/app/chat/' + conversation.id + '/send', {}, JSON.stringify(message))
        setInputValue('')
    }

    const conversationSeen = () => {    
          
        console.log("send")
        stompClient.current.send('/app/chat/' + conversation.id + '/read', {}, JSON.stringify({}))
               
    }

    if (!conversation) {
        return <div>Select a conversation to view</div>
    }

    return (
        <div className="conversation-container">
            <ConversationTop data={conversation} />
            <ConversationMiddle messages={messages} setMessages={setMessages} conData={conversation} newMessageLoad={newMessageLoad} setNewMessageLoad={setNewMessageLoad} conversationGetter={conversationGetter}/>
            <hr className="lg:text-divider-component"></hr>
            <ConversationBottom inputValue={inputValue} setInputValue={setInputValue} handleSendMessage={handleSendMessage} />
        </div>
    )
}

export default Conversation