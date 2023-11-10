import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Graph from "./Graph";
import SideEditor from "../editor/SideEditor";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface EditPlanProps {
    baseData: Task[]
    updateBaseData: (newData: Task[]) => void;
    planId: string
}

const EditPlan: React.FC<EditPlanProps> = ({ baseData, updateBaseData, planId }) => {

    const router = useRouter()

    // editor open state
    const [openEditor, setOpenEditor] = useState(false)
    const [nodeData, setNodeData] = useState('')
    const [subtasks, setSubtasks] = useState([])

    // 
    const updateOpenEditor = async (isOpen: boolean, newData: any, newSubtasks: any) => {
        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/'); // Redirect to landing page
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                taskDescription: newData
            }
            // console.log(requestBody)
            if (requestBody.taskDescription === null || requestBody.taskDescription === 'null') {
                setOpenEditor(isOpen)
            }
            else {
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
                            setOpenEditor(isOpen)
                            if (isOpen) {
                                setNodeData(newData)
                                setSubtasks(data["subtasks"])
                            }
                        }
                    } else {
                        console.error('Request failed with status:', response.status);
                    }
                } catch (error) {
                    console.error('Fetch request error:', error);
                }
            }

        }
    }

    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            <Graph baseData={baseData} updateOpenEditor={updateOpenEditor} />
            <SideEditor nodeData={nodeData} updateBaseData={updateBaseData} openEditor={openEditor} updateOpenEditor={updateOpenEditor} planId={planId} subtasklist={subtasks} />
        </div>
    )
}

export default EditPlan