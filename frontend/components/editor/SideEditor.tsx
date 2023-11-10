import React, { useState, MouseEventHandler } from "react";
import { FaUserAstronaut } from 'react-icons/fa'

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SideEditorProps {
    nodeData: any
    updateBaseData: (newData: Task[]) => void;
    openEditor: boolean
    updateOpenEditor: (isOpen: boolean, newData: any) => void;
}

const SideEditor: React.FC<SideEditorProps> = ({ nodeData, updateBaseData, openEditor, updateOpenEditor }) => {
    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        updateOpenEditor(false, null)
    };
    return (
        <div className={`${openEditor ? 'h-screen' : 'h-fit'} overflow-scroll scrollbar-hide fixed bottom-0 right-0 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-800 w-5/12`}>
            {openEditor ? (<>
                <button
                    className="p-1 pl-8 pr-8 border border-2 border-teal-600 text-teal-600 rounded-2xl"
                    onClick={handleButtonClick}
                >
                    close
                </button>
                <div className="mt-2">
                    <div className="border border-teal-600 text-sm text rounded-2xl">
                        <div className="p-4 max-h-52 font-light overflow-scroll scrollbar-hide">
                            {nodeData}
                        </div>
                        <button className="m-2 p-2 pl-4 pr-4 bg-teal-800 text-teal-200 rounded-xl flex items-center gap-2">
                            <FaUserAstronaut />Generate subtask with AI
                        </button>
                    </div>


                    <textarea className="mt-2 p-2 h-52 w-full text-sm rounded-lg border border-gray-300 focus:outline-none scrollbar-hide" placeholder="Or add your description here..."></textarea>
                    <button className="p-2 pl-4 pr-4 border border-teal-600 rounded-xl text-sm">
                        Add subtask
                    </button>
                </div>
            </>) : (
                <h1 className="p-4 border border-2 border-teal-600 text-teal-600 rounded-3xl inline-flex">Select a node to add a subtask to.</h1>
            )}
        </div>
    )
}

export default SideEditor