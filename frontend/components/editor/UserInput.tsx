import React from "react"
import { AiFillCodeSandboxCircle } from 'react-icons/ai'

interface UserInputProps {
    userInput: string
    editorPhase: string
    handleUserInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const UserInput: React.FC<UserInputProps> = ({ editorPhase, userInput, handleUserInput }) => {
    return (
        <div>
            {editorPhase === 'Fetching' ? (<>
                <div className="mt-2 h-52 w-full border border-gray-300 rounded-2xl text-3xl flex items-center justify-center text-teal-600">
                    <div className="flex items-center justify-center gap-2 p-12 border border-2 border-gray-300 rounded-3xl">
                        <AiFillCodeSandboxCircle className="animate-spin" /> <span className="animate-pulse">loading...</span>
                    </div>
                </div>
            </>) : (<>
                <textarea
                    className="mt-2 p-2 h-52 w-full text-sm rounded-2xl border border-gray-300 focus:outline-none scrollbar-hide"
                    placeholder="Or add your description here..."
                    value={userInput}
                    onChange={handleUserInput}
                ></textarea>
            </>)}
        </div>
    )
}

export default UserInput