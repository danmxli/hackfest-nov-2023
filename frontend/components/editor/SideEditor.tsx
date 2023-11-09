import React, { useState, MouseEventHandler } from "react";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface SideEditorProps {
    baseData: Task[]
    updateBaseData: (newData: Task[]) => void;
    openEditor: boolean
    updateOpenEditor: (isOpen: boolean) => void;
}

const SideEditor: React.FC<SideEditorProps> = ({ baseData, updateBaseData, openEditor, updateOpenEditor }) => {
    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        updateOpenEditor(false)
    };
    return (
        <div className={`${openEditor ? 'h-screen' : 'h-fit'} fixed bottom-0 right-0 p-2 bg-white border-l-2 border-t-2 rounded-tl-3xl border-teal-800 w-5/12`}>
            {openEditor ? (<>
                <button
                className="p-1 pl-8 pr-8 border border-2 border-teal-600 text-teal-600 rounded-2xl"
                    onClick={handleButtonClick}
                >
                    close
                </button>
            </>) : (
                <h1 className="p-4 border border-2 border-teal-600 text-teal-600 rounded-3xl inline-flex">Select a node to add a subtask to.</h1>
            )}
        </div>
    )
}

export default SideEditor