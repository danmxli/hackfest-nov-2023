'use client'
import React, { useState, MouseEventHandler, ChangeEvent } from "react"
import 'react-quill/dist/quill.snow.css';
import { AiFillCodeSandboxCircle } from 'react-icons/ai'
import { ImUpload } from 'react-icons/im'

interface UserInputProps {
    user: any
    planId: string,
    nodeData: any
    fetchChatHistory: () => Promise<void>
    openChatView: boolean
}

const UserInput: React.FC<UserInputProps> = ({ user, planId, nodeData, fetchChatHistory, openChatView }) => {

    // https://github.com/zenoamaro/react-quill/issues/122
    const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

    // handle user input and UserInput state
    const [subtitle, setSubtitle] = useState('')
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }
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
            subtask: textInput,
            subtitle: subtitle
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
                <div className="rounded-t-2xl border-b border-gray-300 p-2 grid grid-cols-5 items-center gap-2 overflow-x-scroll scrollbar-hide">
                    <div className="col-span-4">
                        <input
                            className="w-full focus:outline-none p-2 border border-gray-300 rounded-xl"
                            placeholder="Your subtask title"
                            value={subtitle}
                            onChange={handleTitleChange}
                        ></input>
                    </div>
                    {openChatView ? (
                        <div className="bg-gray-200 text-center rounded-xl p-2 text-gray-500">
                            Insights
                        </div>
                    ) : (
                        <button
                            className="bg-gray-200 rounded-xl p-2 text-gray-500 hover:text-black"
                            onClick={handleOpenChat}
                        >
                            Insights
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
            <button className="mt-2 p-2 pl-4 pr-4 bg-teal-100/50 hover:bg-teal-100 text-teal-600 rounded-xl flex items-center gap-2"
                onClick={addSubtask}
            >
                <ImUpload />Add to all subtasks
            </button>
        </div>
    )
}

export default UserInput