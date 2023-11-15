'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

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
                        localStorage.setItem('userId', JSON.stringify(data["_id"]))
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
                    <h1 className='text-xl'>Welcome back, {user.name}</h1>
                    <div className='mt-2 grid grid-cols-2 gap-2 justify-center items-center'>
                        <div className='border p-2 rounded-lg text-center'>
                            User data
                        </div>
                        <button>
                            <div
                                className='border p-2 rounded-lg text-center'
                                onClick={loadUserAccess}
                            >
                                Go to plan interface
                            </div>
                        </button>

                    </div>
                </div>
            ) : (
                <a href="/api/auth/login">
                    <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4 text-teal-600 text-center">
                        Login
                    </div>
                </a>
            )}

        </div>
    )
}

export default UserPortal