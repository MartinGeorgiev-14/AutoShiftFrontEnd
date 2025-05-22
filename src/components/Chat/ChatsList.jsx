import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import dateTimeFormat from "../../helpers/dateTimeFormater";
import { useDispatch } from "react-redux";
import chatService from "../../services/chatService"
import { debounce } from "lodash"
const ChatsList = ({ chatSelector, chats, setChats, setConversation }) => {
    const dispatch = useDispatch()
    const scrollRef = useRef(null)
    const user = useSelector(state => state.user)
    const conversations = chats.response.conversations

    useEffect(() => {
        const handleScroll = (event) => {
            if (scrollRef.current) {
                const el = scrollRef.current;
                if (el.scrollHeight - el.scrollTop <= el.clientHeight + 20) {
                    if (!chats.response.last) {
                        chatService.getUserConversations(chats.response.pageNo + 1, 5, chatSelector).then(result => {
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
    }, [chats])

    const handleSelect = (event, id) => {
        event.preventDefault()
        const target = document.querySelector(`[id="${id}"]`);

        document.querySelectorAll(".chat-list-item").forEach((item) => {
            if (item !== target) {
                item.classList.remove("selected-chat");
            }
        });

        target.classList.add("selected-chat")
        setConversation(id)

    }

    return (
        <div className="chat-list-holder" ref={scrollRef}>
            {
                conversations.map((chat) => {
                    const mainImg = chat.listingCarDto.images.find(image => image.main)
                    return (
                        <div key={chat.id} id={chat.id} className="chat-list-item" onClick={(event) => handleSelect(event, chat.id)}>
                            <img className="lg:w-24 lg:h-19 lg:rounded-2xl" src={mainImg.url} />
                            <div>
                                {
                                    user.userId === chat.listingCarDto.user.id ?
                                    <p className="lg:text-inner-text">Me</p> :
                                    <p className="lg:text-inner-text">{chat.firstName} {chat.lastName}</p>
                                }
                                <h3 className="lg:font-bold">{chat.listingCarDto.make} {chat.listingCarDto.model}</h3>
                                <p className="lg:text-custom-blue lg:font-bold">{chat.listingCarDto.price} BGN</p>
                            </div>
                            <div className="chat-list-item-right">
                                <p>{dateTimeFormat.formatDateTime(chat.lastTimeChatted)}</p>
                                {
                                    user.userId === chat.buyer.id ?
                                        chat.newMessageCounterSeller > 0 ?
                                            <div className="lg:w-[100%] lg:flex lg:justify-end"><p className="lg:bg-custom-blue lg:text-white lg:px-3 lg:py-1 lg:rounded-full">{chat.newMessageCounterSeller}</p></div> : null :
                                        chat.newMessageCounterBuyer > 0 ?
                                            <div className="lg:w-[100%] lg:flex lg:justify-end"><p className="lg:bg-custom-blue lg:text-white lg:px-3 lg:py-1 lg:rounded-full">{chat.newMessageCounterBuyer}</p> </div> : null
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChatsList;