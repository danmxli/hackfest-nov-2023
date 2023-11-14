import React, { MouseEventHandler } from "react"
import { useRouter } from "next/navigation"
import { FaUserAstronaut } from "react-icons/fa"

interface Message {
    message: string
    role: string
}

interface StarterExamplesProps {
    planId: string
    taskDescription: string
    addMessage: (newMessage: Message) => void
    updateLoadingState: (newState: boolean) => void
}

const StarterExamples: React.FC<StarterExamplesProps> = ({ planId, taskDescription, addMessage, updateLoadingState }) => {

    const router = useRouter()

    const exampleList = [
        { id: 1, label: "Create a list of subtasks I can feasibly accomplish." },
        { id: 2, label: "How can I divide and conquer to complete the base task?" },
        { id: 3, label: "Tell me the most difficult aspect of the base task." },
        { id: 4, label: "What is special about this base task?" },
        { id: 5, label: "How can completing this task make me stronger?" },
        { id: 6, label: "How can I overcome common obstacles?" },
        { id: 7, label: "How much time and effort should I spend on this?" },
        { id: 8, label: "In doing this task, do I have to spend money?" },
        { id: 9, label: "What makes a successful individual?" }
    ]

    const fetchResponse = async (userInput: string) => {

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
            updateLoadingState(true)
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
                        updateLoadingState(false)
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
            <div className="flex items-center justify-center gap-2 text-xl text-gray-400 p-2 rounded-3xl bg-gray-100">
                <FaUserAstronaut />
                Examples to get started:
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                {exampleList.map((item) => (
                    <button
                        key={item.id}
                        className="border border-2 p-2 rounded-xl text-center text-gray-500 hover:border-teal-400 flex items-center justify-center"
                        onClick={() => { fetchResponse(item.label) }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    )
}

export default StarterExamples