import React from "react"
import { useState, useEffect } from "react"
import UserCard from "./sidebar/UserCard"
import PromptTypeIcon from "./sidebar/PromptTypeIcon"
import { BsNodePlusFill, BsLayoutSidebarInset } from "react-icons/bs"

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SidebarProps {
    user: any
    info: string
    history: Array<{ _id: string, description: string, prompt_type: string }>;
    updatePhase: (newPhase: string) => void;
    updatePlanId: (newId: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
    planId: string
}

const Sidebar: React.FC<SidebarProps> = ({ user, info, history, updatePhase, updatePlanId, updatePlanHistory, updateBaseData, planId }) => {
    const [currItem, setCurrItem] = useState('')
    const [isOpen, setIsOpen] = useState(true)

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
            const response = await fetch('http://127.0.0.1:3000/planning/load_one', {
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
        <>
            {isOpen ? (
                <div className="flex flex-col h-screen bg-teal-900 w-48">
                    <div className="grid grid-cols-4">
                        <button
                            className="col-span-3 mt-1.5 ml-1.5 mb-0 p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center gap-2"
                            onClick={() => {
                                setCurrItem('')
                                updatePhase('NewPlan')
                            }}
                        >
                            <BsNodePlusFill />New plan
                        </button>
                        <button
                            className="col-span-1 m-1.5 mb-0 p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center justify-center"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            <BsLayoutSidebarInset />
                        </button>
                    </div>

                    <div className="flex-grow max-h-fit overflow-scroll scrollbar-hide">
                        {history.map((item, index) => (
                            <div
                                key={item._id}
                                className="m-1.5"
                            >
                                <button
                                    onClick={() => (
                                        loadOne(item._id)
                                    )}
                                    className={`flex gap-2 items-center w-full h-8 p-2 hover:bg-teal-700 rounded-lg text-white cursor-pointer overflow-hidden whitespace-nowrap ${currItem === item._id ? "bg-teal-700" : ""}`}>
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
                    <UserCard user={user} info={info} updatePlanHistory={updatePlanHistory} updatePhase={updatePhase} />
                </div>
            ) : (
                <>
                    <div className="flex flex-col h-screen bg-teal-900">
                        <button
                            className="col-span-1 m-1.5 mb-0 p-2.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center justify-center"
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }}
                        >
                            <BsLayoutSidebarInset />
                        </button>
                    </div>

                </>
            )}
        </>

    )
}

export default Sidebar