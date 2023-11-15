import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BsFillFilePersonFill } from "react-icons/bs"
import { BiLogOut, BiCodeAlt } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"
import Image from 'next/image';


interface UserCardProps {
    user: any
    info: string
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string }>) => void;
    updatePhase: (newPhase: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, info, updatePlanHistory, updatePhase }) => {
    const router = useRouter()

    const actionClear = async () => {
        const requestBody = {
            email: user.email
        }
        try {
            const response = await fetch('http://127.0.0.1:3000/planning/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    updatePhase('NewPlan')
                    updatePlanHistory(data["history"])
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <div className="relative m-1.5 mt-0">
            <div className="w-full p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 items-center">
                <div className="flex items-center mb-1.5 gap-1">
                    {user.picture ? (
                        <Image
                            src={user.picture}
                            alt='picture'
                            width={20}
                            height={20}
                            className='rounded-full'
                        />
                    ) : (
                        <Image
                            src={'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                            alt='picture'
                            width={20}
                            height={20}
                            className='rounded-full'
                        />
                    )}
                    {info}
                </div>
                <button
                    className="w-full flex items-center gap-1 text-sm p-1 pl-3 pr-3 bg-teal-900/75 hover:text-white rounded-lg"
                    onClick={actionClear}
                >
                    <AiOutlineClear /> clear all plans
                </button>
                <a
                    className="w-full mt-1 flex items-center gap-1 text-sm p-1 pl-3 pr-3 bg-teal-900/75 hover:text-white rounded-lg"
                    href="/api/auth/logout"
                >
                    <BiLogOut /> logout
                </a>
                <button className="w-full mt-1 flex items-center gap-1 text-sm p-1 pl-3 pr-3 bg-teal-900/75 hover:text-white rounded-lg">
                    <BiCodeAlt /> updates
                </button>
            </div>
        </div>
    )
}

export default UserCard
