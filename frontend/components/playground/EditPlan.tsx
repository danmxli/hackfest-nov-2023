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
}

const EditPlan: React.FC<EditPlanProps> = ({ baseData, updateBaseData }) => {
    // editor open state
    const [openEditor, setOpenEditor] = useState(false)
    const [nodeData, setNodeData] = useState('')
    const updateOpenEditor = (isOpen: boolean, newData: any) => {
        setOpenEditor(isOpen)
        if (isOpen) {
            setNodeData(newData)
        }
    }

    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            <Graph baseData={baseData} updateOpenEditor={updateOpenEditor} />
            <SideEditor nodeData={nodeData} updateBaseData={updateBaseData} openEditor={openEditor} updateOpenEditor={updateOpenEditor} />
        </div>
    )
}

export default EditPlan