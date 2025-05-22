
const ConversationBottom = ({ inputValue, setInputValue, handleSendMessage }) => {

    return (
        <div className="lg:h-[10%] flex w-full">
            <textarea
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message"
                className="lg:w-[80%] lg:m-2 lg:resize-none px-2 lg:flex lg:justify-center lg:border lg:rounded-lg"
            />
            <button onClick={() => {
                handleSendMessage()
            }}
            className="lg:w-[20%] lg:bg-custom-blue lg:text-white lg:m-2 lg:rounded-lg
             lg:p-2 lg:font-bold lg:hover:bg-custom-hover-blue lg:flex lg:justify-center lg:items-center lg:cursor-ponter">
                Send</button>
        </div>
    )
}

export default ConversationBottom