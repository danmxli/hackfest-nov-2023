import React, { MouseEventHandler, useState, useEffect } from "react"
import ChatInput from "./chat/ChatInput"
import { useRouter } from "next/navigation"
import { FaUserAstronaut } from "react-icons/fa"

interface Message {
    message: string
    role: string
}

interface ChatViewProps {
    openChatView: boolean
    updateChatView: (isOpen: boolean) => void
    chatHistory: Message[]
    addMessage: (newMessage: Message) => void
    planId: string
    taskDescription: string
    clearChatHistory: () => void
}

const ChatView: React.FC<ChatViewProps> = ({ openChatView, updateChatView, chatHistory, addMessage, planId, taskDescription, clearChatHistory }) => {

    const router = useRouter()

    // local copy of chat history
    const [historyCopy, setHistoryCopy] = useState<Message[]>([])

    useEffect(() => {
        setHistoryCopy([...chatHistory])
    }, [chatHistory])

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
        updateInputValue('')

        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/'); // Redirect to landing page
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                taskDescription: taskDescription,
                prompt: userInput
            }
            addMessage({ message: userInput, role: 'user' })
            setIsLoading(true)
            try {
                const response = await fetch('http://127.0.0.1:3000/chat/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        console.log(data["chat_logs"])
                        addMessage(data["chat_logs"][1])
                        setIsLoading(false)
                    }
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Fetch request error:', error);
            }
        }
    }

    const handleClearHistory: MouseEventHandler<HTMLButtonElement> = async () => {
        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/'); // Redirect to landing page
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                taskDescription: taskDescription,
                action: "clear"
            }
            try {
                const response = await fetch('http://127.0.0.1:3000/chat/history', {
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
    }

    return (
        <>
            {openChatView ? (
                <div className="fixed bottom-0 right-1/3 w-1/4 h-5/6 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-400">
                    <div className="h-full grid grid-rows-6">
                        <div className="row-span-5 overflow-scroll scrollbar-hide">
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
                                <div className="flex items-center justify-center gap-2 text-xl text-gray-400">
                                    <FaUserAstronaut />
                                    Examples to get started:
                                </div>
                                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        Create a list of subtasks I can feasibly accomplish.
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        How can I divide and conquer to complete the base task?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        Tell me the most difficult aspect of the base task.
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        What is special about this base task?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        How can completing this task make me stronger?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        How can I overcome common obstacles?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        How much time and effort should I spend on this?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        In doing this task, do I have to spend money?
                                    </div>
                                    <div className="border border-2 p-2 rounded-xl text-center text-gray-400 flex items-center justify-center">
                                        What makes a successful individual?
                                    </div>
                                </div>
                            </>)}

                        </div>
                        <div className="text-xs flex items-center justify-center">

                            <ChatInput inputValue={inputValue} updateInputValue={updateInputValue} fetchResponse={fetchResponse} isLoading={isLoading} />

                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="p-1 pl-8 pr-8 border border-2 border-teal-400 bg-white text-teal-600 rounded-2xl text-xs"
                                onClick={handleClearHistory}
                            >
                                clear chat
                            </button>
                            <button
                                className="p-1 pl-8 pr-8 border border-2 border-teal-400 bg-white text-teal-600 rounded-2xl text-xs"
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