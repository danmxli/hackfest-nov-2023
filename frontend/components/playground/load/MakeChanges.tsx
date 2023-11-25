import React, { useState } from "react"
import ChangeBaseTasks from "./makechanges/ChangeBaseTasks";
import { IoLink } from "react-icons/io5";

// base data object structure
interface Task {
    description: string;
    order: string;
    sub_tasks: any[];
}
interface Doc {
    title: string
    url: string
}

interface LoadingPlanProps {
    user: any
    planPrompt: string;
    promptType: string;

    // data from Load
    rawResponse: string;
    baseTasks: Task[];
    resources: Doc[];

    // function to update baseTasks
    editTask: (selectedTask: Task) => void;
    removeTask: (selectedTask: Task) => void;
    addTask: (newTask: Task, placeHolder: Task, position: number) => void;

    // update functions
    updatePhase: (newPhase: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
    updatePlanId: (newId: string) => void;
    updateBaseResources: (newResource: Doc[]) => void;
    updateTokenCount: (newCount: number) => void;
}

const MakeChanges: React.FC<LoadingPlanProps> = ({ user, planPrompt, promptType, rawResponse, baseTasks, resources, editTask, removeTask, addTask, updatePhase, updatePlanHistory, updateBaseData, updatePlanId, updateBaseResources, updateTokenCount }) => {

    const createBasePlan = async () => {
        const requestBody = {
            email: user.email,
            prompt: planPrompt,
            prompt_type: promptType,
            task_list: baseTasks,
            resource_list: resources
        }
        console.log(requestBody)
        try {
            const response = await fetch('https://seepickle-production.up.railway.app/planning/base', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    if (data["message"] === "not enough tokens") {
                        updatePhase('OutOfTokens')
                    }
                    else {
                        updateBaseData(data["base_plan"])
                        updateBaseResources(data["resources"])
                        updatePlanId(data["base_id"])
                        updatePlanHistory(data["history"])
                        updateTokenCount(data["tokens"])
                        updatePhase('EditPlan')
                    }
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <div className="h-full overflow-scroll scrollbar-hide">
            <div className="p-8 pt-0 m-4 border border-2 border-teal-800 rounded-3xl h-full overflow-scroll scrollbar-hide">
                <div className="sticky top-0 pt-6 bg-white border-b border-gray-300">
                    <h1 className="text-xl">Creating blueprint for &#34;{planPrompt}&#34;</h1>
                    <button
                        className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl mt-3 mb-3"
                        onClick={() => {
                            createBasePlan()
                        }}
                    >
                        Create Base Plan
                    </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-8">
                    <div className="p-4 bg-gray-300 rounded-3xl">
                        {baseTasks.length > 0 ? (
                            <>
                                <ChangeBaseTasks baseTasks={baseTasks} editTask={editTask} removeTask={removeTask} addTask={addTask} />
                            </>

                        ) : (<></>)}
                        {resources.length > 0 ? (
                            <div className="mt-3 space-y-3 p-3 border border-gray-600 bg-white rounded-xl">
                                {resources.map((resource, index) => (
                                    <div key={index} >
                                        <a href={resource.url} className="text-sm">

                                            <div className="border text-gray-500 hover:border-teal-400 hover:text-black p-2 rounded-xl break-words">
                                                <IoLink />{resource.title}
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>) : (<></>)}
                    </div>
                    <div>
                        <div className="p-4 border border-gray-300 rounded-3xl">
                            <p className="whitespace-break-spaces font-light">
                                {rawResponse}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MakeChanges