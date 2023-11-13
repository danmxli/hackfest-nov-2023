import React, { MouseEventHandler } from "react"

interface ChatViewProps {
    openChatView: boolean
    updateChatView: (isOpen: boolean) => void
}

const ChatView: React.FC<ChatViewProps> = ({ openChatView, updateChatView }) => {

    const handleCloseChat: MouseEventHandler<HTMLButtonElement> = () => {
        updateChatView(false)
    }

    return (
        <>
            {openChatView ? (
                <div className="fixed bottom-0 right-1/3 w-1/4 h-5/6 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-800">
                    <button
                        className="p-1 pl-4 pr-4 border border-2 border-teal-600 text-teal-600 rounded-2xl text-xs"
                        onClick={handleCloseChat}
                    >
                        exit chat
                    </button>
                    <div className="mt-2">

                    </div>
                </div>
            ) : (<></>)}
        </>
    )
}

export default ChatView