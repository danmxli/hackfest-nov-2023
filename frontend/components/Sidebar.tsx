import React from "react"
import { useState, useEffect } from "react"
import UserCard from "./sidebar/UserCard"
import PromptTypeIcon from "./sidebar/PromptTypeIcon"

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}
interface Doc {
    title: string
    url: string
}

interface SidebarProps {
    user: any
    info: string
    history: Array<{ _id: string, description: string, prompt_type: string }>;
    updatePhase: (newPhase: string) => void;
    updatePlanId: (newId: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
    planId: string;
    updateBaseResources: (newResource: Doc[]) => void;
    displayTokenCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ user, info, history, updatePhase, updatePlanId, updatePlanHistory, updateBaseData, planId, updateBaseResources, displayTokenCount }) => {
    const [currItem, setCurrItem] = useState('')
    const updateCurrItem = (newItem: string) => {
        setCurrItem(newItem)
    }

    useEffect(() => {
        setCurrItem(planId)
    }, [planId])

    const loadOne = async (id: string): Promise<void> => {
        const requestBody = {
            email: user.email,
            planId: id
        }
        updatePhase('RenderingPlan')
        try {
            const response = await fetch('https://seepickle-production.up.railway.app/planning/load_one', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data["match"]["_id"])
                    console.log(data["match"]["base_tasks"])
                    updateBaseData(data["match"]["base_tasks"])
                    updateBaseResources(data["match"]["resources"])
                    updatePlanId(data["match"]["_id"])
                    setCurrItem(id)
                    updatePhase('EditPlan')
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <div className="flex flex-col h-screen bg-teal-900 w-48">
            <UserCard user={user} info={info} updatePlanHistory={updatePlanHistory} updatePhase={updatePhase} updateCurrItem={updateCurrItem} displayTokenCount={displayTokenCount} />
            <div className="flex-grow max-h-fit overflow-scroll scrollbar-hide">
                {history.slice().reverse().map((item, index) => (
                    <div
                        key={item._id}
                        className="m-2"
                    >
                        <button
                            onClick={() => (
                                loadOne(item._id)
                            )}
                            className={`flex gap-2 items-center w-full h-8 p-2 hover:bg-teal-700 rounded-xl text-white cursor-pointer overflow-hidden whitespace-nowrap ${currItem === item._id ? "bg-teal-700" : ""}`}>
                            <div>
                                <PromptTypeIcon promptType={item.prompt_type} />
                            </div>
                            <span className="truncate text-xs">
                                {item.description}
                            </span>

                        </button>

                    </div>
                ))}
            </div>
            <div className="p-3"></div>
        </div>
    )
}

export default Sidebar