import React, { MouseEventHandler, useState } from "react"
import ChatInput from "./chat/ChatInput"

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
                    <div className="h-full grid grid-rows-6">
                        <div className="row-span-5 rounded-2xl border border-gray-300">

                        </div>
                        <div className="text-xs flex items-center justify-center">

                            <ChatInput />

                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="p-1 pl-8 pr-8 border border-2 border-teal-600 text-teal-600 rounded-2xl text-xs"
                                onClick={handleCloseChat}
                            >
                                exit chat
                            </button>
                        </div>
                    </div>
                </div>

            ) : (<></>)}
        </>
    )
}

export default ChatView