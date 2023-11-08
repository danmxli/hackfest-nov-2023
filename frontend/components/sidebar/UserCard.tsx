import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BsFillFilePersonFill } from "react-icons/bs"
import { BiLogOut, BiSolidCoin } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"

interface UserCardProps {
    info: string
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string }>) => void;
    updatePhase: (newPhase: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ info, updatePlanHistory, updatePhase }) => {
    const router = useRouter()

    const actionClear = async () => {
        const userId = localStorage.getItem('userId')
        if (userId == null || userId == 'null') {
            console.error('null userId')
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId)
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
    }

    return (
        <div className="relative m-1.5 mt-0">
            <div className="w-full p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 items-center">
                <div className="flex items-center gap-2 mb-6">
                    <BsFillFilePersonFill /> {info}
                </div>
                <button
                    className="flex items-center gap-1 text-sm p-1 pl-3 pr-3 border border-teal-600 bg-teal-800 hover:text-white rounded-xl"
                    onClick={actionClear}
                >
                    <AiOutlineClear /> clear all plans
                </button>
                <button
                    className="mt-1 flex items-center gap-1 text-sm p-1 pl-3 pr-3 border border-teal-600 bg-teal-800 hover:text-white rounded-xl"
                    onClick={() => {
                        localStorage.setItem('userId', JSON.stringify(null))
                        router.push('/')
                    }}
                >
                    <BiLogOut /> logout
                </button>
                <button className="mt-1 flex items-center gap-1 text-sm p-1 pl-3 pr-3 border border-teal-600 bg-teal-800 hover:text-white rounded-xl">
                    <BiSolidCoin /> purchase tokens
                </button>
            </div>

            <div className="text-xs mt-1.5 w-full p-1.5 bg-teal-950 border border-1 border-teal-600 rounded-lg text-teal-300 items-center">
                tokens used: 1/1000
            </div>
        </div>
    )
}

export default UserCard
