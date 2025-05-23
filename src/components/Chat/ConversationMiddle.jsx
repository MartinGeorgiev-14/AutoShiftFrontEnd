import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import chatService from "../../services/chatService";
import { debounce } from "lodash";

const ConversationMiddle = ({ messages, setMessages, conData, newMessageLoad, setNewMessageLoad, conversationGetter}) => {
    const user = useSelector(state => state.user);
    const conRef = useRef(null);
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    // Initial set scroll position to bottom
    useEffect(() => {
        if (conRef.current && !initialLoadDone) {
            conRef.current.scrollTop = conRef.current.scrollHeight;
            setInitialLoadDone(true)
        }
        
    }, [messages, initialLoadDone])

    // Scroll to bottom when new message is loaded
    useEffect(() => {
        if (conRef.current && newMessageLoad) {
            conRef.current.scrollTop = conRef.current.scrollHeight;
            setNewMessageLoad(false);
            console.log("New message loaded");
        }
    },[messages, newMessageLoad])

    // Load more messages when scrolled to top and scroll position stays the same
    useEffect(() => {
        const container = conRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (container.scrollTop <= 20) {
                if (!messages.last) {
                    const previousScrollHeight = container.scrollHeight;
                    chatService
                        .getUserChatMesages(messages.pageNo + 1, 5, conData.id)
                        .then(result => {
                                setMessages(prev => ({
                                    ...result.response,
                                    messages: [...result.response.messages, ...prev.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                }));
                                setTimeout(() => {
                                    const newScrollHeight = container.scrollHeight;
                                    container.scrollTop = newScrollHeight - previousScrollHeight;
                                }, 0);
                        });
                }
            }
        };

        const debouncedScroll = debounce(handleScroll, 200);
        container.addEventListener("scroll", debouncedScroll);

        return () => {
            container.removeEventListener("scroll", debouncedScroll);
        };
    }, [messages]);

    if (Object.keys(conData).length === 0) {
        return null;
    }

    return (
        <div ref={conRef} className="lg:h-[65%] lg:overflow-y-scroll">
            {messages.messages?.map((message, index) => (
                <div key={index} className="lg:p-3">
                    {user.userId === message.senderId ? (
                        <div className="w-full flex flex-col items-end">
                            <p className="text-xs">{message.senderUser.firstName} {message.senderUser.lastName}</p>
                            <p className="bg-custom-blue text-white w-fit p-1 rounded-sm">{message.content}</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col">
                            <p className="text-xs">{message.senderUser.firstName} {message.senderUser.lastName}</p>
                            <p className="bg-other-chatter-gray w-fit p-1 rounded-sm">{message.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ConversationMiddle;
