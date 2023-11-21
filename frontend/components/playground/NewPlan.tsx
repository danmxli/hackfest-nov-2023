import React from "react";
import { useState } from "react";
import { FaBolt, FaCodeBranch, FaBookOpen } from "react-icons/fa6";

interface NewPlanProps {
    updatePhase: (newPhase: string) => void;
    updatePlanPrompt: (newPrompt: string) => void;
    promptType: string
    updatePromptType: (newPromptType: string) => void;
}

const NewPlan: React.FC<NewPlanProps> = ({ updatePhase, updatePlanPrompt, promptType, updatePromptType }) => {
    // update user input
    const [userInput, setUserInput] = useState('')
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };
    const userAction = () => {
        updatePlanPrompt(userInput)
        updatePhase('LoadingPlan')
    }

    const promptOptions = [
        {
            type: 'prompt_quickstart',
            icon: <FaBolt />,
            title: 'Quick start',
            description: 'Bring your ideas to life with our starter template.',
        },
        {
            type: 'prompt_developer',
            icon: <FaCodeBranch />,
            title: 'Developer',
            description: 'Need to learn a new programming language or create a web app? Choose this template with a technical focus.',
        },
        {
            type: 'prompt_academia',
            icon: <FaBookOpen />,
            title: 'Academia',
            description: 'Need to learn partial derivatives in t-minus 9 hours? Choose this template to boost your academic journey.',
        },
    ];

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-8 m-4 border border-2 border-teal-800 rounded-3xl max-w-5xl">
                <h1 className="text-3xl">
                    What goals do <span className='text-teal-600'>you</span> want to achieve?
                </h1>
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {promptOptions.map((option) => (
                        <button key={option.type} onClick={() => updatePromptType(option.type)}>
                            <div className={`p-2 border rounded-lg break-words text-left ${promptType === option.type && 'border-teal-600'}`}>
                                <div className="flex items-center gap-1">
                                    {option.icon}{option.title}
                                </div>
                                <p className="text-xs text-gray-700">{option.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
                <input
                    className="mt-4 w-full text-lg border-b-2 border-teal-600 focus:outline-none"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <button
                    className="mt-4 p-2 pl-4 pr-4 border border-2 border-teal-800 hover:text-teal-600 rounded-3xl"
                    onClick={userAction}
                >
                    Generate base plan
                </button>
            </div>

        </div>
    )
}

export default NewPlan