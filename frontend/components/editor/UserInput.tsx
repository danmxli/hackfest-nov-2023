import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { ImUpload } from 'react-icons/im'

interface UserInputProps {
    planId: string,
    nodeData: any
}

const UserInput: React.FC<UserInputProps> = ({ planId, nodeData }) => {

    const router = useRouter()

    // handle user input and UserInput state
    const [textInput, setTextInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // handle adding subtask
    const addSubtask = async () => {
        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/')
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                taskDescription: nodeData,
                action: "add",
                subtask: textInput
            }
            console.log(requestBody)
            try {
                const response = await fetch('http://127.0.0.1:3000/planning/edit_subtask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        console.log(data)
                        setTextInput('Successfully added! You can clear this text')
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
        <div className="mt-2 p-4 border border-teal-600 text-sm text rounded-2xl">
            <button className="p-2 pl-4 pr-4 bg-teal-800 text-teal-200 rounded-xl flex items-center gap-2"
                onClick={addSubtask}
            >
                <ImUpload />Add to all subtasks
            </button>
            {isLoading ? (<>
                <div className="mt-2 h-52 w-full border border-gray-300 rounded-2xl text-3xl flex items-center justify-center text-teal-600">
                    <div className="flex items-center justify-center gap-2 p-12 border border-2 border-gray-300 rounded-3xl">
                        <AiFillCodeSandboxCircle className="animate-spin" /> <span className="animate-pulse">loading...</span>
                    </div>
                </div>
            </>) : (<>
                <textarea
                    className="mt-2 p-2 h-52 w-full text-sm rounded-2xl border border-gray-300 focus:outline-none scrollbar-hide"
                    placeholder="Your description here..."
                    value={textInput}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setTextInput(e.target.value);
                    }}
                ></textarea>
            </>)}
        </div>
    )
}

export default UserInput