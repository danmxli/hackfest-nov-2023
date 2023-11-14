import React, { MouseEventHandler, useState } from "react"
import ChatInput from "./chat/ChatInput"

interface Message {
    message: string
    role: string
}

interface ChatViewProps {
    openChatView: boolean
    updateChatView: (isOpen: boolean) => void
    chatHistory: Message[]
    addMessage: (newMessage: Message) => void
}

const ChatView: React.FC<ChatViewProps> = ({ openChatView, updateChatView, chatHistory, addMessage }) => {

    const handleCloseChat: MouseEventHandler<HTMLButtonElement> = () => {
        updateChatView(false)
    }

    // chat input value and loading states
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const updateInputValue = (newValue: string) => {
        setInputValue(newValue)
    }

    const fetchResponse = async (userInput: string) => {
        console.log(userInput)
        updateInputValue('')
        setIsLoading(true)
    }

    return (
        <>
            {openChatView ? (
                <div className="fixed bottom-0 right-1/3 w-1/4 h-5/6 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-400">
                    <div className="h-full grid grid-rows-6">
                        <div className="row-span-5 overflow-scroll scrollbar-hide">
                            {chatHistory.map((message, index) => (
                                <div
                                    key={index}
                                    className={`${message.role === 'user' ? 'justify-end' : 'justify-start'
                                        } flex mb-1`
                                    }
                                >
                                    <div
                                        className={`border ${message.role === 'user' ? 'bg-teal-100 border-teal-300' : 'bg-gray-50/50 border-gray-300'
                                            } rounded-2xl max-w-3/4 p-3`}
                                    >
                                        <p className="text-sm font-light">{message.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs flex items-center justify-center">

                            <ChatInput inputValue={inputValue} updateInputValue={updateInputValue} fetchResponse={fetchResponse} isLoading={isLoading} />

                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="p-1 pl-8 pr-8 border border-2 border-teal-400 bg-white text-teal-600 rounded-2xl text-xs"
                                onClick={handleCloseChat}
                            >
                                exit chat
                            </button>
                            <button
                                className="p-1 pl-8 pr-8 border border-2 border-teal-400 bg-white text-teal-600 rounded-2xl text-xs"
                                onClick={handleCloseChat}
                            >
                                clear chat
                            </button>
                        </div>
                    </div>
                </div>

            ) : (<></>)}
        </>
    )
}

export default ChatView