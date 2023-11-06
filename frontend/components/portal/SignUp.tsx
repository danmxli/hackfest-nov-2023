import React from "react";
import { useRouter } from 'next/navigation';

interface SignUnProps {
    updatePhase: (newPhase: string) => void;
}

const SignUp: React.FC<SignUnProps> = ({ updatePhase }) => {
    const router = useRouter()

    return (
        <div className="p-8 bg-teal-950 border border-2 border-teal-600 rounded-3xl m-4">
            <h1 className="text-2xl text-teal-300 pb-6">Sign up for an account</h1>
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
            <div className="mt-8">
                <div className="text-teal-600">
                    password confirmation
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
                        updatePhase('SignIn')
                    }}
                    className="mt-8 bg-teal-50 border border-2 border-teal-300 p-1 pl-6 pr-6 rounded-3xl text-teal-950">
                    Existing User? Sign In
                </button>
            </div>

        </div>
    )
}

export default SignUp