import React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import UserCard from "./sidebar/UserCard"
import { BsNodePlusFill } from "react-icons/bs"
import { AiOutlineNodeIndex } from "react-icons/ai"

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SidebarProps {
    info: string
    history: Array<{ _id: string, description: string }>;
    updatePhase: (newPhase: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ info, history, updatePhase, updatePlanHistory, updateBaseData }) => {
    const router = useRouter()
    const fetchExecuted = useRef(false)
    const [currItem, setCurrItem] = useState('')

    useEffect(() => {
        if (!fetchExecuted.current) {
            fetchExecuted.current = true
        }
    })

    const loadOne = async (id: string): Promise<void> => {
        const userId = localStorage.getItem('userId')
        if (userId == null || userId == 'null') {
            console.error('null userId')
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: id
            }
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
                        console.log(data["match"]["base_tasks"])
                        updateBaseData(data["match"]["base_tasks"])
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
    }

    return (
        <div className="flex flex-col h-screen bg-teal-900 w-48">
            <button
                className="m-1.5 mb-0 p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center gap-2"
                onClick={() => {
                    setCurrItem('')
                    updatePhase('NewPlan')
                }}
            >
                <BsNodePlusFill />New plan
            </button>
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
                                <AiOutlineNodeIndex />
                            </div>
                            <span className="truncate text-xs">
                                {item.description}
                            </span>

                        </button>

                    </div>
                ))}
            </div>
            <UserCard info={info} updatePlanHistory={updatePlanHistory} updatePhase={updatePhase} />
        </div>
    )
}

export default Sidebar