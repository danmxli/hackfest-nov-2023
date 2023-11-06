import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BsThreeDotsVertical, BsFillFilePersonFill } from "react-icons/bs"

interface UserCardProps {
    info: string
}

const UserCard: React.FC<UserCardProps> = ({ info }) => {
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    return (
        <div className="relative m-1.5">
            <div className="w-full p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 items-center">
                <div className="flex items-center gap-1 mb-6">
                    <BsFillFilePersonFill /> {info}
                </div>
                <button className="flex text-sm p-1 border border-teal-600 bg-teal-800 hover:text-white rounded">
                    clear plan history
                </button>
                <button
                    className="mt-1 flex text-sm p-1 border border-teal-600 bg-teal-800 hover:text-white rounded"
                    onClick={() => {
                        localStorage.setItem('userId', JSON.stringify(null))
                        router.push('/')
                    }}
                >
                    logout
                </button>
                <button className="mt-1 flex text-sm p-1 border border-teal-600 bg-teal-800 hover:text-white rounded">
                    purchase tokens
                </button>
            </div>

            <div className="text-xs mt-1.5 w-full p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 items-center">
                tokens used: 1/1000
            </div>
        </div>
    )
}

export default UserCard
