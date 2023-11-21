import React from "react"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { BiLogOutCircle } from "react-icons/bi"
import { AiOutlineClear } from "react-icons/ai"
import { CiSettings } from "react-icons/ci";
import { BsNodePlusFill } from "react-icons/bs"
import { RiTokenSwapLine } from "react-icons/ri";
import Image from 'next/image';


interface UserCardProps {
    user: any
    info: string
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updatePhase: (newPhase: string) => void;
    updateCurrItem: (newItem: string) => void;
    displayTokenCount: number
}

const UserCard: React.FC<UserCardProps> = ({ user, info, updatePlanHistory, updatePhase, updateCurrItem, displayTokenCount }) => {

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
        <div className="relative">
            <div className="w-full text-teal-200 items-center">
                <div className="flex items-center justify-center p-4 pb-0 m-2 mb-0">

                    {user.picture ? (
                        <Image
                            src={user.picture}
                            alt='picture'
                            width={50}
                            height={50}
                            className='rounded-full border border-teal-200'
                        />
                    ) : (
                        <Image
                            src={'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                            alt='picture'
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                    )}
                </div>
                <div className="text-center mb-4">
                    <h1 className="text-lg">{info}</h1>
                    <h2 className="text-xs text-teal-500">{user.email}</h2>
                </div>
                <div className="bg-teal-950 m-2 p-3 rounded-3xl">
                    <h1
                        className="w-full flex items-center gap-1 text-sm p-0.5 hover:text-white"
                    >
                        <RiTokenSwapLine /> {displayTokenCount} tokens
                    </h1>
                    <button
                        className="w-full mt-1 flex items-center gap-1 text-sm p-0.5 hover:text-white"
                        onClick={actionClear}
                    >
                        <AiOutlineClear /> Clear all plans
                    </button>
                    <a
                        className="w-full mt-1 flex items-center gap-1 text-sm p-0.5 hover:text-white"
                        href="/api/auth/logout"
                    >
                        <BiLogOutCircle /> Logout
                    </a>
                    <button
                        className="w-full mt-1 flex items-center gap-1 text-sm p-0.5 hover:text-white"
                        onClick={() => {
                            router.push('/user')
                        }}
                    >
                        <CiSettings /> User info
                    </button>
                    <button className="w-full mt-1 flex items-center justify-center gap-1 text-sm p-1.5 bg-teal-900 rounded-xl hover:text-white"
                        onClick={() => {
                            updateCurrItem('')
                            updatePhase('NewPlan')
                        }}
                    >
                        <BsNodePlusFill /> New plan
                    </button>
                </div>

            </div>
        </div>
    )
}

export default UserCard
