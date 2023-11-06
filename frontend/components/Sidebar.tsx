import React from "react"
import { useRouter } from "next/navigation"
import UserCard from "./sidebar/UserCard"

interface SidebarProps {
    info: string
}

const Sidebar: React.FC<SidebarProps> = ({ info }) => {
    const router = useRouter()

    return (
        <div className="flex flex-col h-screen bg-teal-900 w-48">
            <div className="flex-grow">
            </div>
            <UserCard info={info} />
        </div>
    )
}

export default Sidebar