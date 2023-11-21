import React, { useState } from "react"
import Image from 'next/image';
import { useRouter } from "next/navigation";
import TokenCount from "./insights/TokenCount";

interface TopProfileProps {
    user: any
}

const TopProfile: React.FC<TopProfileProps> = ({ user }) => {

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
                fetch('http://127.0.0.1:3000/users/access', {
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
        <div className="flex justify-center gap-3">
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
            <div className="p-8 border border-gray-300 shadow rounded-3xl flex gap-3">
                <div className="p-4 border border-gray-300 rounded-2xl">
                    <div>
                        <TokenCount />
                    </div>
                    <h1 className="mt-2 p-2 pl-8 pr-8 text-teal-800 bg-teal-100/50 rounded-xl">
                        tokens left
                    </h1>
                </div>
                <div className="">
                    <div>
                        View token usage
                    </div>
                    <div>Buy more tokens</div>
                </div>
            </div>
        </div>
    )
}

export default TopProfile