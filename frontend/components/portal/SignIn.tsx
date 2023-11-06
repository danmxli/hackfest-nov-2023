import React from "react";
import { useRouter } from 'next/navigation';

interface SignInProps {
    updatePhase: (newPhase: string) => void;
}

const SignIn: React.FC<SignInProps> = ({updatePhase}) => {
    const router = useRouter()

    return (
        <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4">
            <h1 className="text-2xl text-teal-300 pb-6">Welcome back, user!</h1>
            <div>
                <div className="text-teal-600">
                    username
                </div>
                <input
                    className="w-full bg-teal-950 text-white border-b-2 border-teal-600 focus:outline-none"
                />
            </div>
            <div className="mt-8">
                <div className="text-teal-600">
                    password
                </div>
                <input
                    className="w-full bg-teal-950 text-white border-b-2 border-teal-600 focus:outline-none"
                />
            </div>
            <div className="inline-flex gap-3">
                <button
                    onClick={() => {
                        router.push('/home')
                    }}
                    className="mt-8 bg-teal-50 border border-2 border-teal-300 p-1 pl-12 pr-12 rounded-3xl text-teal-950">
                    Next
                </button>
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