import React, { useState, useEffect } from "react"
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
    // editor open state
    const [openEditor, setOpenEditor] = useState(false)
    const [nodeData, setNodeData] = useState('')
    const [subtasks, setSubtasks] = useState([])

    const updateOpenEditor = (isOpen: boolean, newData: any, newSubtasks: any) => {
        setOpenEditor(isOpen)
        if (isOpen) {
            setNodeData(newData)
            setSubtasks(newSubtasks)
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