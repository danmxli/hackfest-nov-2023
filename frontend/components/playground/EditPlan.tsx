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
    const updateOpenEditor = (isOpen: boolean) => {
        setOpenEditor(isOpen)
    }
    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            <Graph baseData={baseData} updateOpenEditor={updateOpenEditor} />
            <SideEditor baseData={baseData} updateBaseData={updateBaseData} openEditor={openEditor} updateOpenEditor={updateOpenEditor} />
        </div>
    )
}

export default EditPlan