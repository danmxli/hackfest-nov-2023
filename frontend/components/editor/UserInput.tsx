import React, { useState, MouseEventHandler, useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { ImUpload } from 'react-icons/im'
import { FaUserAstronaut } from 'react-icons/fa'

interface UserInputProps {
    user: any
    planId: string,
    nodeData: any
    fetchChatHistory: () => Promise<void>
    openChatView: boolean
}

const UserInput: React.FC<UserInputProps> = ({ user, planId, nodeData, fetchChatHistory, openChatView }) => {

    // handle user input and UserInput state
    const [textInput, setTextInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // open chat view
    const handleOpenChat: MouseEventHandler<HTMLButtonElement> = () => {
        fetchChatHistory()
    }

    // handle adding subtask
    const addSubtask = async () => {
        const requestBody = {
            email: user.email,
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
                    setTextInput('<p>successfully added</p>')
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <div className="mt-2 p-4 border border-gray-300 text-sm text rounded-2xl shadow">
            <div className="w-full border border-gray-300 bg-gray-50 rounded-2xl">
                <div className="rounded-t-2xl border-b border-gray-300 p-2">
                    {openChatView ? (
                        <div className="flex items-center gap-2 text-gray-400">
                            <FaUserAstronaut />AI help and insights
                        </div>
                    ) : (
                        <button
                            className="flex items-center gap-2 text-gray-400 hover:text-black"
                            onClick={handleOpenChat}
                        >
                            <FaUserAstronaut />AI help and insights
                        </button>
                    )}
                </div>
                <div className="bg-white rounded-b-2xl p-2">
                    {isLoading ? (<>
                        <div className="mt-2 h-64 w-full border border-gray-300 rounded-2xl text-3xl flex items-center justify-center text-teal-600">
                            <div className="flex items-center justify-center gap-2 p-12 border border-2 border-gray-300 rounded-3xl">
                                <AiFillCodeSandboxCircle className="animate-spin" /> <span className="animate-pulse">loading...</span>
                            </div>
                        </div>
                    </>) : (<>
                        <div className="w-full h-72 overflow-scroll scrollbar-hide">
                                <ReactQuill theme="snow" value={textInput} onChange={setTextInput} className="h-72" />
                        </div>
                    </>)}
                </div>

            </div>
            <button className="mt-2 p-2 pl-4 pr-4 bg-teal-800 hover:bg-teal-600 text-teal-200 rounded-xl flex items-center gap-2"
                onClick={addSubtask}
            >
                <ImUpload />Add to all subtasks
            </button>
        </div>
    )
}

export default UserInput