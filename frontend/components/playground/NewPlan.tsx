import React from "react";
import { useState } from "react";

interface NewPlanProps {
    updatePhase: (newPhase: string) => void;
    updatePlanPrompt: (newPrompt: string) => void;
}

const NewPlan: React.FC<NewPlanProps> = ({ updatePhase, updatePlanPrompt }) => {
    // update user input
    const [userInput, setUserInput] = useState('')
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const userAction = () => {
        updatePlanPrompt(userInput)
        console.log(userInput)
        updatePhase('EditPlan')
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-8 m-4 border border-2 border-teal-800 rounded-3xl">
                <h1 className="text-3xl">
                    What goals do <span className='text-teal-600'>you</span> want to achieve?
                </h1>
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

            <div className="m-4 border border-2 border-teal-300 rounded-3xl w-72 shadow-lg shadow-teal-300">
                <div className="p-4 m-4 bg-teal-600 text-teal-100 border border-2 border-teal-500 rounded-3xl">
                    Starter Examples:
                </div>
                <div className="p-4 m-4 border border-2 border-teal-500 rounded-3xl">
                    <h1 className="italic">I have moderate biking experience. I want to bike to Niagara Falls.</h1>
                </div>
                <div className="p-4 m-4 border border-2 border-teal-500 rounded-3xl">
                    <h1 className="italic">I am a university student researching neurological technologies. I want to learn python for data science.</h1>
                </div>
            </div>

        </div>
    )
}

export default NewPlan