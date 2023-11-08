import React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import UserCard from "./sidebar/UserCard"
import { BsNodePlusFill } from "react-icons/bs"
import { AiOutlineNodeIndex } from "react-icons/ai"

interface SidebarProps {
    info: string
    history: Array<{ _id: string, description: string }>;
    updatePhase: (newPhase: string) => void;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string }>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ info, history, updatePhase, updatePlanHistory }) => {
    const router = useRouter()
    const fetchExecuted = useRef(false)

    useEffect(() => {
        if (!fetchExecuted.current) {
            fetchExecuted.current = true
            // if phase is newPlan, fetch all existing plans
        }
    })

    return (
        <div className="flex flex-col h-screen bg-teal-900 w-48">
            <button
                className="m-1.5 mb-0 p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center gap-2"
                onClick={() => {
                    updatePhase('NewPlan')
                }}
            >
                <BsNodePlusFill />New plan
            </button>
            <div className="flex-grow max-h-fit overflow-scroll scrollbar-hide">
                {history.map((item, index) => (
                    <div
                        key={item._id}
                        className="m-1.5 p-2 hover:bg-teal-700 rounded-lg text-white text-sm cursor-pointer flex items-center gap-2"
                    >
                        <AiOutlineNodeIndex />
                        {item.description}
                    </div>
                ))}
            </div>
            <UserCard info={info} updatePlanHistory={updatePlanHistory} updatePhase={updatePhase} />
        </div>
    )
}

export default Sidebar