import { useRouter } from "next/navigation";
import React, { useState, MouseEventHandler } from "react";
import { FaUserAstronaut } from 'react-icons/fa'
import { AiFillCodeSandboxCircle } from 'react-icons/ai'

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SideEditorProps {
    nodeData: any
    updateBaseData: (newData: Task[]) => void;
    openEditor: boolean
    updateOpenEditor: (isOpen: boolean, newData: any) => void;
    planId: string
}

const SideEditor: React.FC<SideEditorProps> = ({ nodeData, updateBaseData, openEditor, updateOpenEditor, planId }) => {
    const router = useRouter()
    const [editorPhase, setEditorPhase] = useState('')

    // update user input
    const [userInput, setUserInput] = useState('')
    const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        updateOpenEditor(false, null)
    };

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
                subtask: userInput
            }
            console.log(requestBody)
            setEditorPhase('fetching')
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
                        setEditorPhase('')
                        setUserInput('Subtask successfully added! You can clear this text.')
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
        <div className={`${openEditor ? 'h-screen' : 'h-fit'} overflow-scroll scrollbar-hide fixed bottom-0 right-0 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-800 w-5/12`}>
            {openEditor ? (<>
                <button
                    className="p-1 pl-8 pr-8 border border-2 border-teal-600 text-teal-600 rounded-2xl"
                    onClick={handleButtonClick}
                >
                    close
                </button>
                <div className="mt-2">
                    <div className="border border-teal-600 text-sm text rounded-2xl">
                        <div className="p-4 max-h-52 font-light overflow-scroll scrollbar-hide">
                            {nodeData}
                        </div>
                        <button className="m-2 p-2 pl-4 pr-4 bg-teal-800 text-teal-200 rounded-xl flex items-center gap-2">
                            <FaUserAstronaut />Generate subtask with AI
                        </button>
                    </div>

                    {editorPhase === 'fetching' ? (<>
                        <div className="mt-2 h-52 w-full border border-gray-300 rounded-lg text-3xl flex items-center justify-center text-teal-600">
                            <div className="flex items-center justify-center gap-2 p-12 border border-2 border-gray-300 rounded-3xl">
                                <AiFillCodeSandboxCircle className="animate-spin" /> <span className="animate-pulse">loading...</span>
                            </div>
                        </div>
                    </>) : (<>
                        <textarea
                            className="mt-2 p-2 h-52 w-full text-sm rounded-lg border border-gray-300 focus:outline-none scrollbar-hide"
                            placeholder="Or add your description here..."
                            value={userInput}
                            onChange={handleUserInput}
                        ></textarea>
                    </>)}

                    <button
                        className="mt-2 p-2 pl-4 pr-4 border border-teal-600 rounded-xl text-sm"
                        onClick={addSubtask}
                    >
                        Add subtask
                    </button>
                </div>
            </>) : (
                <h1 className="p-4 border border-2 border-teal-600 text-teal-600 rounded-3xl inline-flex">Select a node to add a subtask to.</h1>
            )}
        </div>
    )
}

export default SideEditor