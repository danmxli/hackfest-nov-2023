import React from "react"

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface EditPlanProps {
    baseData: Task[]
}

function renderTask(task: Task): React.JSX.Element {
    return (
        <div key={task.order} className="w-96 border border-teal-500 p-4 rounded-3xl my-4 mx-2">
            <h2 className="font-light text-lg">{task.description}</h2>
            {task.sub_tasks.length > 0 && (
                <div className="">
                    {task.sub_tasks.map((subTask) => renderTask(subTask))}
                </div>
            )}
        </div>
    );
}

const EditPlan: React.FC<EditPlanProps> = ({ baseData }) => {

    return (
        <div className="h-screen overflow-scroll scrollbar-hide flex flex-col items-center">
            {baseData.map((task) => renderTask(task))}
        </div>
    )
}

export default EditPlan