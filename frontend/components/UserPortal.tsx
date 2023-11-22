'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { GiPlantRoots } from 'react-icons/gi'
import Image from 'next/image';

interface PortalPhases {
    [key: string]: React.ReactNode;
}

const UserPortal = () => {
    const { user, isLoading } = useUser()
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
        <div>
            {user ? (
                <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4 text-teal-600">
                    <div className='flex items-center justify-center mb-6'>
                        <div className='flex items-center justify-center text-5xl text-teal-200'><GiPlantRoots /></div>
                        {user.picture ? (
                            <Image
                                src={user.picture}
                                alt='picture'
                                width={50}
                                height={50}
                                className='rounded-full border border border-teal-200'
                            />
                        ) : (
                            <Image
                                src={'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                alt='picture'
                                width={50}
                                height={50}
                                className='rounded-full border border-2 border-teal-200'
                            />
                        )}
                    </div>


                    <h1 className='text-2xl text-center text-teal-400'>Welcome, {user.name}</h1>
                    <div className='mt-4 grid grid-cols-2 gap-2'>
                        <button
                            className='border border-teal-900 hover:border-teal-200 p-3 rounded-3xl text-center flex items-center justify-center'
                            onClick={() => {
                                router.push('/user')
                            }}
                        >
                            User info
                        </button>
                        <button>
                            {fetchingUser ? (
                                <div className='border border-teal-900 p-3 rounded-3xl text-center flex items-center justify-center gap-2'>
                                    <AiOutlineLoading3Quarters className="animate-spin" /> Opening plans
                                </div>
                            ) : (
                                <div
                                    className='border border-teal-900 hover:border-teal-200 p-3 rounded-3xl text-center flex items-center justify-center'
                                    onClick={loadUserAccess}
                                >
                                    Go to your plans
                                </div>
                            )}
                        </button>

                    </div>
                </div>
            ) : (
                <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4 text-teal-600 text-center">
                    <div className='flex items-center justify-center text-8xl text-teal-200'><GiPlantRoots /></div>
                    <h1 className='mt-6 text-2xl text-teal-400'>Develop your ideas from the ground up.</h1>
                    {isLoading ? (
                        <div className='mt-6 p-2 rounded-3xl border border-teal-900'>
                            <div className='flex items-center justify-center gap-2'>
                                <AiOutlineLoading3Quarters className="animate-spin" />Loading user details
                            </div>
                        </div>
                    ) : (
                        <a href="/api/auth/login">
                            <div className='mt-6 p-2 pl-16 pr-16 rounded-3xl border border-teal-900 hover:border-teal-200 inline-flex'>
                                Click to login
                            </div>
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserPortal