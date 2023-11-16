import React, { useState, useEffect } from "react"
import Graph from "./Graph";
import SideEditor from "../editor/SideEditor";
import ResourceView from "./ResourceView";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}
interface Doc {
    title: string
    url: string
}

interface EditPlanProps {
    user: any
    baseData: Task[]
    updateBaseData: (newData: Task[]) => void;
    planId: string
    baseResources: Doc[]
}

const EditPlan: React.FC<EditPlanProps> = ({ user, baseData, updateBaseData, planId, baseResources }) => {

    // editor open state
    const [openEditor, setOpenEditor] = useState(false)
    const [nodeData, setNodeData] = useState('')
    const [subtasks, setSubtasks] = useState([])

    // 
    const updateOpenEditor = async (isOpen: boolean, newData: any, newSubtasks: any) => {
        const requestBody = {
            email: user.email,
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

    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            <Graph baseData={baseData} updateOpenEditor={updateOpenEditor} />
            <ResourceView baseResources={baseResources} />
            <SideEditor user={user} nodeData={nodeData} updateBaseData={updateBaseData} openEditor={openEditor} updateOpenEditor={updateOpenEditor} planId={planId} subtasklist={subtasks} />
        </div>
    )
}

export default EditPlan