import { useRouter } from "next/navigation";
import React, { useState, useEffect, MouseEventHandler } from "react";
import { FaUserAstronaut } from 'react-icons/fa'
import UserInput from "./UserInput";
import DisplaySubtasks from "./DisplaySubtasks";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SideEditorProps {
    nodeData: any
    updateBaseData: (newData: Task[]) => void;
    openEditor: boolean
    updateOpenEditor: (isOpen: boolean, newData: any, newSubtasks: any) => void;
    planId: string
    subtasklist: {
        _id: string;
        description: string;
    }[]

}

const SideEditor: React.FC<SideEditorProps> = ({ nodeData, updateBaseData, openEditor, updateOpenEditor, planId, subtasklist }) => {
    const router = useRouter()
    const [localSubtasks, setLocalSubtasks] = useState([...subtasklist])
    useEffect(() => {
        // update localSubtasks when subtasklist change
        setLocalSubtasks([...subtasklist]);
    }, [subtasklist]);

    const updateLocalSubtasks = (newLocalSubtask: {
        _id: string;
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

    // close the editor
    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        updateOpenEditor(false, null, null)
    };

    // define object of phases
    const options: sideEditorPhases = {
        AddSubtask: <UserInput planId={planId} nodeData={nodeData} />,
        ViewSubtask: <DisplaySubtasks subtaskItems={localSubtasks} planId={planId} nodeData={nodeData} updateLocalSubtasks={updateLocalSubtasks} />
    }

    // handle view subtask
    const viewSubtask = async () => {
        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/'); // Redirect to landing page
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                taskDescription: nodeData
            }
            console.log(requestBody)

            try {
                const response = await fetch('http://127.0.0.1:3000/planning/all_subtasks', {
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
    }

    return (
        <div className={`${openEditor ? 'h-screen' : 'h-fit'} overflow-scroll scrollbar-hide fixed bottom-0 right-0 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-800 w-1/3`}>
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
                    <button
                        className="mt-2 p-2 pl-4 pr-4 border border-teal-600 rounded-xl text-sm"
                        onClick={viewSubtask}
                    >
                        All subtasks
                    </button>
                    <button
                        className="mt-2 ml-2 p-2 pl-4 pr-4 border border-teal-600 rounded-xl text-sm"
                        onClick={() => {
                            setEditorPhase('AddSubtask')
                        }}
                    >
                        Add subtask
                    </button>
                    {options[editorPhase]}
                </div>
            </>) : (
                <h1 className="p-4 border border-2 border-teal-600 text-teal-600 rounded-3xl inline-flex">Select a node to add a subtask to.</h1>
            )}
        </div>
    )
}

export default SideEditor