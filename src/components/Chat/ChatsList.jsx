import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import dateTimeFormat from "../../helpers/dateTimeFormater";
import { useDispatch } from "react-redux";
import chatService from "../../services/chatService"
import { debounce } from "lodash" 
const ChatsList = ({ chatSelector, chats, setChats }) => {
    const dispatch = useDispatch()
    const scrollRef = useRef(null)
    console.log("chats", chats)
    useEffect(() => {
        const handleScroll = (event) => {
            if (scrollRef.current) {
            const el = scrollRef.current;
            if(el.scrollHeight - el.scrollTop <= el.clientHeight + 20) {
                console.log("last?", chats)
                if(!chats.response.last){
                    console.log("ebter")
                    chatService.getUserConversations(chats.response.pageNo + 1, 5, chatSelector).then(result => {
                        console.log("result", result)
                        dispatch(setChats(result))
                    })
                 
                } 
            }
        }
        }
       

        const debounceHandleScroll = debounce(handleScroll, 300);
        const el = scrollRef.current;

        el.addEventListener('scroll', debounceHandleScroll)
        return () => {
            el.removeEventListener('scroll', debounceHandleScroll)
        }
    },[chats])

    if(!chats.response.conversations) {
        return <div>Loading...</div>
    }

    const user = useSelector(state => state.user)
    const conversations = chats.response.conversations

    return(
        <div className="chat-list-holder" ref={scrollRef}>
                {
                    conversations.map((chat) => {
                        const mainImg = chat.listingCarDto.images.find(image => image.main)
                
                        return (
                            <a key={chat.id} className="chat-list-item" href={"#"}>
                                <img className="lg:rounded-lg" src={mainImg.url} width={"100px"} height={"100px"}/>
                                <div>
                                    <p className="lg:text-inner-text">{chat.firstName} {chat.lastName}</p>
                                    <h3 className="lg:font-bold">{chat.listingCarDto.make} {chat.listingCarDto.model}</h3>
                                    <p className="lg:text-custom-blue lg:font-bold">{chat.listingCarDto.price} BGN</p>
                                </div>
                                <div className="chat-list-item-right">
                                    <p>{dateTimeFormat.formatDateTime(chat.lastTimeChatted)}</p>
                                    {
                                        user.userId === chat.buyer.id ? 
                                        chat.newMessageCounterSeller > 0 ?
                                       <div className="lg:w-[100%] lg:flex lg:justify-end"><p className="lg:bg-custom-blue lg:text-white lg:px-3 lg:py-1 lg:rounded-full">{chat.newMessageCounterSeller}</p></div>: null :
                                        chat.newMessageCounterBuyer > 0 ?
                                       <div className="lg:w-[100%] lg:flex lg:justify-end"><p className="lg:bg-custom-blue lg:text-white lg:px-3 lg:py-1 lg:rounded-full">{chat.newMessageCounterB}</p> </div> : null
                                    }
                                </div>
                            </a>
                        )
                    })
                }
        </div>
    )
}

export default ChatsList;