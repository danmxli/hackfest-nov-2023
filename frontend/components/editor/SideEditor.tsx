import { useRouter } from "next/navigation";
import React, { useState, useEffect, MouseEventHandler } from "react";
import UserInput from "./UserInput";
import DisplaySubtasks from "./DisplaySubtasks";
import ChatView from "../playground/ChatView";
import { RiNodeTree } from "react-icons/ri";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SideEditorProps {
    user: any
    nodeData: any
    updateBaseData: (newData: Task[]) => void;
    openEditor: boolean
    updateOpenEditor: (isOpen: boolean, newData: any, newSubtasks: any) => void;
    planId: string
    subtasklist: {
        _id: string;
        title: string;
        description: string;
    }[]
    updateTokenCount: (newCount: number) => void;
}

interface Message {
    message: string
    role: string
}

const SideEditor: React.FC<SideEditorProps> = ({ user, nodeData, updateBaseData, openEditor, updateOpenEditor, planId, subtasklist, updateTokenCount }) => {
    const router = useRouter()
    const [localSubtasks, setLocalSubtasks] = useState([...subtasklist])
    useEffect(() => {
        // update localSubtasks when subtasklist change
        setLocalSubtasks([...subtasklist]);
    }, [subtasklist]);

    const updateLocalSubtasks = (newLocalSubtask: {
        _id: string;
        title: string;
        description: string;
    }[]) => {
        setLocalSubtasks(newLocalSubtask)
    }

    // sideEditor phases interface
    interface sideEditorPhases {
        [key: string]: React.ReactNode;
    }

    // phases are 'Fetching' 'ViewSubtask'
    const [editorPhase, setEditorPhase] = useState('ViewSubtask')

    // chat view update state function
    const [openChatView, setOpenChatView] = useState(false)
    const updateChatView = (isOpen: boolean) => {
        setOpenChatView(isOpen)
    }
    useEffect(() => {
        updateChatView(false)
    }, [nodeData])

    // close the editor
    const handleCloseEditor: MouseEventHandler<HTMLButtonElement> = () => {
        updateChatView(false)
        updateOpenEditor(false, null, null)
    };


    // chat history state, funct to add messages to the chat history
    const [chatHistory, setChatHistory] = useState<Message[]>([])
    const addMessage = (newMessage: Message) => {
        setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
    };
    const clearChatHistory = () => {
        setChatHistory([])
    }

    // handle view subtask
    const viewSubtask = async () => {
        const requestBody = {
            email: user.email,
            planId: planId,
            taskDescription: nodeData
        }
        console.log(requestBody)

        try {
            const response = await fetch('https://seepickle-production.up.railway.app/planning/all_subtasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data["subtasks"])
                    setLocalSubtasks(data["subtasks"])
                    setEditorPhase('ViewSubtask')
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    // handle open chat view
    const fetchChatHistory = async () => {
        const requestBody = {
            email: user.email,
            planId: planId,
            taskDescription: nodeData,
            action: "view"
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
                    console.log(data["history"])
                    setChatHistory(data["history"])
                    updateChatView(true)
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    // define object of phases
    const options: sideEditorPhases = {
        AddSubtask: <UserInput user={user} planId={planId} nodeData={nodeData} fetchChatHistory={fetchChatHistory} openChatView={openChatView} />,
        ViewSubtask: <DisplaySubtasks user={user} subtaskItems={localSubtasks} planId={planId} nodeData={nodeData} updateLocalSubtasks={updateLocalSubtasks} />
    }

    return (
        <div className={`${openEditor ? 'h-screen' : 'h-fit rounded-tl-3xl border-t'} overflow-scroll scrollbar-hide fixed bottom-0 right-0 p-2 bg-white border-l border-gray-400 w-1/3`}>
            {openEditor ? (<>
                <button
                    className="p-2 pl-8 pr-8 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-2xl text-xs"
                    onClick={handleCloseEditor}
                >
                    close
                </button>
                <div className="mt-2">
                    <div className="border border-gray-300 shadow text-sm text rounded-2xl">
                        <div className="p-4 max-h-52 font-light overflow-scroll scrollbar-hide">
                            {nodeData}
                        </div>
                        <div className="flex gap-2 ml-4 mb-4">
                            <button
                                className={`p-2 pl-4 pr-4 hover:bg-gray-400 text-gray-100 rounded-xl text-sm ${editorPhase === 'ViewSubtask' ? 'bg-gray-400' : 'bg-gray-500'}`}
                                onClick={viewSubtask}
                            >
                                All subtasks
                            </button>
                            <button
                                className={`p-2 pl-4 pr-4 hover:bg-gray-400 text-gray-100 rounded-xl text-sm ${editorPhase === 'AddSubtask' ? 'bg-gray-400' : 'bg-gray-500'}`}
                                onClick={() => {
                                    setEditorPhase('AddSubtask')
                                }}
                            >
                                Add subtask
                            </button>
                        </div>
                    </div>
                    {options[editorPhase]}
                </div>
                <ChatView user={user} openChatView={openChatView} updateChatView={updateChatView} chatHistory={chatHistory} addMessage={addMessage} planId={planId} taskDescription={nodeData} clearChatHistory={clearChatHistory} updateTokenCount={updateTokenCount} />
            </>) : (
                <h1 className="p-4 border border-gray-300 shadow-lg rounded-3xl inline-flex items-center gap-2"><RiNodeTree /> Select a node to add a subtask to.</h1>
            )}
        </div>
    )
}

export default SideEditor