import React from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import CheckPasswordStrength from "./Check";

interface SignUpProps {
    updatePhase: (newPhase: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ updatePhase }) => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [pwdAgain, setPwdAgain] = useState('')
    const [isFetchingUsers, setIsFetchingUsers] = useState(false)
    const [isExistingUser, setIsExistingUser] = useState(false)
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleUpdatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPwdAgain(e.target.value)
    }

    const verifyUser = () => {
        const requestBody = {
            username: name,
            password: password,
        }
        setIsFetchingUsers(true)
        try {
            fetch('http://127.0.0.1:3000/users/signup', {
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
                    if (data['username'] === 'existing found') {
                        setPassword('')
                        setPwdAgain('')
                        setIsExistingUser(true)
                    }
                    else {
                        setIsExistingUser(false)
                        localStorage.setItem('userId', JSON.stringify(data["_id"]))
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
            <h1 className="text-2xl text-teal-300 pb-6">Sign up for an account</h1>
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
                    <p className={`text-xs ${CheckPasswordStrength(password) ? '' : 'text-gray-400'}`}>at least 8 characters, case sensitive, contains at least 1 letter and special character</p>
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={handleUpdatePassword}
                    className={`w-full bg-teal-950 text-white border-b-2 focus:outline-none ${CheckPasswordStrength(password) ? 'border-teal-600' : 'border-gray-400'}`}
                />
            </div>
            <div className="mt-8">
                <div className="text-teal-600">
                    password confirmation
                </div>
                <input
                    type="password"
                    value={pwdAgain}
                    onChange={handleConfirmPassword}
                    className="w-full bg-teal-950 text-white border-b-2 border-teal-600 focus:outline-none"
                />
            </div>
            <div className="inline-flex gap-3">
                {CheckPasswordStrength(password) && name !== "" && password !== "" && pwdAgain === password ? (<>
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