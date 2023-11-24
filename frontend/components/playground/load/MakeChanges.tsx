import React, { useState } from "react"
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

    // update functions
    updatePhase: (newPhase: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
    updatePlanId: (newId: string) => void;
    updateBaseResources: (newResource: Doc[]) => void;
    updateTokenCount: (newCount: number) => void;
}

const MakeChanges: React.FC<LoadingPlanProps> = ({ user, planPrompt, promptType, rawResponse, baseTasks, resources, updatePhase, updatePlanHistory, updateBaseData, updatePlanId, updateBaseResources, updateTokenCount }) => {

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
            <div className="p-8 m-4 border border-2 border-teal-800 rounded-3xl">
                <h1 className="text-xl">Creating blueprint for {planPrompt}</h1>
                <button
                    className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl mb-3"
                    onClick={() => {
                        createBasePlan()
                    }}
                >
                    Create Base Plan
                </button>
                <div className="grid grid-cols-2 gap-8">
                    <div className="p-4 bg-teal-100 rounded-3xl">
                        {baseTasks.length > 0 ? (
                            <div className="space-y-3">
                                {baseTasks.map((item, index) => (
                                    <div key={index} className="p-3 border border-teal-600 bg-white rounded-xl">
                                        <p className="whitespace-break-spaces font-light">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (<></>)}
                        {resources.length > 0 ? (
                            <div className="mt-3 space-y-3 p-3 border border-teal-600 bg-white rounded-xl">
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
                    <div className="p-4 border border-gray-300 shadow rounded-3xl">
                        <p className="whitespace-break-spaces font-light">
                            {rawResponse}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeChanges