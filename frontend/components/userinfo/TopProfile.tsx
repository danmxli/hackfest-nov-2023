import React, { useState } from "react"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import TokenCount from "./insights/TokenCount";

interface TopProfileProps {
    user: any
    tokenCount: number
    phase: string
    updatePhase: (newPhase: string) => void
}

const TopProfile: React.FC<TopProfileProps> = ({ user, tokenCount, phase, updatePhase }) => {

    const router = useRouter()
    const [fetchingUser, setFetchingUser] = useState(false)

    const loadUserAccess = () => {
        if (user) {
            const requestBody = {
                name: user.name,
                email: user.email,
            }
            setFetchingUser(true)
            try {
                fetch('https://seepickle-production.up.railway.app/users/access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            console.error('Request failed with status:', response.status);
                        }
                    })
                    .then(data => {
                        setFetchingUser(false)
                        router.push('/home')
                    })
                    .catch(error => {
                        console.error('Request failed:', error);
                    });
            }
            catch (error) {
                console.error('Fetch request error:', error)
            }
        }

    }

    return (
        <div className="flex justify-center gap-6 mt-3">
            <div className="p-8 border border-gray-300 shadow rounded-3xl grid items-center justify-center">
                <div className="p-4 bg-gray-100 rounded-2xl flex items-center gap-3">
                    <div>
                        {user.picture ? (
                            <Image
                                src={user.picture}
                                alt='picture'
                                width={50}
                                height={50}
                                className='rounded-full'
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

                    <div>
                        <h1 className="text-4xl">{user.name}</h1>
                        {user.email}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <button className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl"
                        onClick={loadUserAccess}
                    >
                        Home
                    </button>
                    <a className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl" href="/api/auth/logout">
                        Logout
                    </a>
                </div>


            </div>
            <div className="p-8 border border-gray-300 shadow rounded-3xl flex gap-6">
                <div className="p-4 border border-gray-300 rounded-2xl">
                    <div>
                        <TokenCount num={tokenCount} />
                    </div>
                    <h1 className="mt-2 p-2 pl-8 pr-8 text-teal-800 bg-teal-100/50 rounded-xl">
                        tokens left
                    </h1>
                </div>
                <div className="grid items-center">
                    <button className={`p-2 pl-4 pr-4 border border-gray-300 ${phase == 'Logs' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100 rounded-xl`}
                        onClick={() => {
                            updatePhase('Logs')
                        }}
                    >
                        Usage logs
                    </button>
                    <button className={`p-2 pl-4 pr-4 border border-gray-300 ${phase == 'Integrations' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100 rounded-xl`}
                        onClick={() => {
                            updatePhase('Integrations')
                        }}
                    >
                        Integrations
                    </button>
                    <button className={`p-2 pl-4 pr-4 border border-gray-300 ${phase == 'Buy' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100 rounded-xl`}
                        onClick={() => {
                            updatePhase('Buy')
                        }}
                    >
                        API keys
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopProfile