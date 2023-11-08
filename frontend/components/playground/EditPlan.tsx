import React, { useEffect } from "react"
import Graph from "./Graph";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface EditPlanProps {
    baseData: Task[]
}

const EditPlan: React.FC<EditPlanProps> = ({ baseData }) => {
    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            <Graph baseData={baseData} />
        </div>
    )
}

export default EditPlan