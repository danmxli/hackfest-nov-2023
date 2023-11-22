import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import CheckPasswordStrength from "./Check";

interface SignInProps {
    updatePhase: (newPhase: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ updatePhase }) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isFetchingUsers, setIsFetchingUsers] = useState(false)
    const [userNotFound, setUserNotFound] = useState(false)
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const verifyUser = () => {
        const requestBody = {
            username: name,
            password: password,
        }
        setIsFetchingUsers(true)
        try {
            fetch('https://seepickle.vercel.app/users/signin', {
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
                    if (data['username'] === 'not found') {
                        setPassword('')
                        setUserNotFound(true)
                    }
                    else {
                        setUserNotFound(false)
                        router.push('/home')
                    }
                    setIsFetchingUsers(false)
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        }
        catch (error) {
            console.error('Fetch request error:', error)
        }
    }

    return (
        <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4">
            <h1 className="text-2xl text-teal-300 pb-6">Welcome back, user!</h1>
            <div>
                <div className="text-teal-600">
                    username
                </div>
                <input
                    value={name}
                    onChange={handleUserChange}
                    className="w-full bg-teal-950 text-white border-b-2 border-teal-600 focus:outline-none"
                />
            </div>
            <div className="mt-8">
                <div className="text-teal-600">
                    password
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={handleUpdatePassword}
                    className="w-full bg-teal-950 text-white border-b-2 border-teal-600 focus:outline-none"
                />
            </div>
            <div className="inline-flex gap-3">
                {CheckPasswordStrength(password) && name !== "" && password !== "" ? (<>
                    <button
                        onClick={verifyUser}
                        className="mt-8 bg-teal-50 border border-2 border-teal-300 p-1 pl-12 pr-12 rounded-3xl text-teal-950">
                        Next
                    </button>
                </>) : (<>
                    <div className="mt-8 bg-gray-400 border border-2 border-gray-300 p-1 pl-12 pr-12 rounded-3xl text-gray-600 flex items-center">
                        Next
                    </div>
                </>)}
                <button
                    onClick={() => {
                        updatePhase('SignUp')
                    }}
                    className="mt-8 bg-teal-50 border border-2 border-teal-300 p-1 pl-6 pr-6 rounded-3xl text-teal-950">
                    New User? Sign Up
                </button>
            </div>
        </div>
    )
}

export default SignIn