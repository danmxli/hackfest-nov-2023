'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface PortalPhases {
    [key: string]: React.ReactNode;
}

const UserPortal = () => {
    const { user, isLoading } = useUser()
    const router = useRouter()

    const loadUserAccess = () => {
        if (user) {
            const requestBody = {
                name: user.name,
                email: user.email,
            }
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
                    <h1 className='text-2xl text-center text-teal-400'>Welcome, {user.name}</h1>
                    <div className='mt-6 grid grid-cols-2 gap-2'>
                        <div className='border border-teal-900 hover:border-teal-600 p-3 rounded-3xl text-center flex items-center justify-center'>
                            User data
                        </div>
                        <button>
                            <div
                                className='border border-teal-900 hover:border-teal-600 p-3 rounded-3xl text-center flex items-center justify-center'
                                onClick={loadUserAccess}
                            >
                                Go to plan interface
                            </div>
                        </button>

                    </div>
                </div>
            ) : (
                <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4 text-teal-600 text-center">
                    <h1 className='text-2xl text-teal-400'>Develop your ideas from the ground up.</h1>
                    {isLoading ? (
                        <div className='mt-6 p-2 rounded-3xl border border-teal-900'>
                            <div className='flex items-center justify-center gap-2'>
                                <AiOutlineLoading3Quarters className="animate-spin" />Loading user details
                            </div>
                        </div>
                    ) : (
                        <a href="/api/auth/login">
                            <div className='mt-6 p-2 rounded-3xl border border-teal-900 hover:border-teal-600'>
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