import React from "react"
import { useRouter } from "next/navigation"
import UserCard from "./sidebar/UserCard"
import { BsNodePlusFill } from "react-icons/bs"

interface SidebarProps {
    info: string
    updatePhase: (newPhase: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ info, updatePhase }) => {
    const router = useRouter()

    return (
        <div className="flex flex-col h-screen bg-teal-900 w-48">
            <button
                className="m-1.5 p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 hover:bg-teal-700 flex items-center gap-2"
                onClick={() => {
                    updatePhase('NewPlan')
                }}
            >
                <BsNodePlusFill />New plan
            </button>
            <div className="flex-grow">
            </div>
            <UserCard info={info} />
        </div>
    )
}

export default Sidebar