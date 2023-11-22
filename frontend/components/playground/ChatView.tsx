import React, { MouseEventHandler, useState, useEffect, useRef } from "react"
import ChatInput from "./chat/ChatInput"
import { useRouter } from "next/navigation"
import StarterExamples from "./chat/StarterExamples"

interface Message {
    message: string
    role: string
}

interface ChatViewProps {
    user: any
    openChatView: boolean
    updateChatView: (isOpen: boolean) => void
    chatHistory: Message[]
    addMessage: (newMessage: Message) => void
    planId: string
    taskDescription: string
    clearChatHistory: () => void
    updateTokenCount: (newCount: number) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ user, openChatView, updateChatView, chatHistory, addMessage, planId, taskDescription, clearChatHistory, updateTokenCount }) => {

    const router = useRouter()

    // local copy of chat history
    const [historyCopy, setHistoryCopy] = useState<Message[]>([])

    useEffect(() => {
        setHistoryCopy([...chatHistory])
    }, [chatHistory])

    // no more tokens state
    const [noMoreTokens, setNoMoreTokens] = useState(false)

    // ref to scroll to bottom whenever historyCopy value updates
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [historyCopy]);

    const handleCloseChat: MouseEventHandler<HTMLButtonElement> = () => {
        updateChatView(false)
    }

    // chat input value and loading states
    const [isLoading, setIsLoading] = useState(false)
    const updateLoadingState = (newState: boolean) => {
        setIsLoading(newState)
    }

    const [inputValue, setInputValue] = useState('')
    const updateInputValue = (newValue: string) => {
        setInputValue(newValue)
    }

    const fetchResponse = async (userInput: string) => {
        updateInputValue('')

        const requestBody = {
            email: user.email,
            planId: planId,
            taskDescription: taskDescription,
            prompt: userInput
        }
        addMessage({ message: userInput, role: 'user' })
        setIsLoading(true)
        try {
            const response = await fetch('https://seepickle-production.up.railway.app/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data["status"])
                    if (data["status"] === "not enough tokens") {
                        setNoMoreTokens(true)
                    }
                    else {
                        console.log(data["chat_logs"])
                        addMessage(data["chat_logs"][1])
                        updateTokenCount(data["tokens"])
                    }
                    setIsLoading(false)
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    const handleClearHistory: MouseEventHandler<HTMLButtonElement> = async () => {
        const requestBody = {
            email: user.email,
            planId: planId,
            taskDescription: taskDescription,
            action: "clear"
        }
        try {
            const response = await fetch('https://seepickle-production.up.railway.app/chat/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    clearChatHistory()
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <>
            {openChatView ? (
                <div className="fixed bottom-0 right-1/3 w-1/4 h-5/6 p-2 m-2 bg-white border rounded-3xl border-gray-400 overflow-scroll scrollbar-hide">
                    <div className="h-full grid grid-rows-6">
                        <div ref={chatContainerRef} className="row-span-5 overflow-scroll scrollbar-hide">
                            {historyCopy.length > 0 ? (<>
                                {historyCopy.map((message, index) => (
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
                            </>) : (<>
                                <StarterExamples fetchResponse={fetchResponse} />
                            </>)}

                        </div>
                        <div className="text-xs flex items-center justify-center">

                            <ChatInput inputValue={inputValue} updateInputValue={updateInputValue} fetchResponse={fetchResponse} isLoading={isLoading} />

                        </div>
                        {noMoreTokens ? (<div className="border border-orange-300 bg-orange-50 text-orange-600 text-center text-xs p-2 mb-1 rounded-3xl">
                            No more tokens left.
                        </div>) : (<></>)}
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="p-2 pl-8 pr-8 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-2xl text-xs"
                                onClick={handleClearHistory}
                            >
                                clear chat
                            </button>
                            <button
                                className="p-2 pl-8 pr-8 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-2xl text-xs"
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