import React from "react";
import { RiNodeTree } from 'react-icons/ri'

interface DisplaySubtasksProps {
    subtaskItems: {
        _id: string;
        description: string;
    }[]
}

const DisplaySubtasks: React.FC<DisplaySubtasksProps> = ({ subtaskItems }) => {
    return (
        <div className="mt-2 p-4 overflow-scroll scrollbar-hide border border-teal-600 rounded-2xl font-light grid gap-2">
            {subtaskItems.length > 0 ? (<>
                {subtaskItems.map(item => (
                    <div key={item._id}
                        className="p-2 border border-gray-300 hover:border-teal-400 rounded-xl flex items-center gap-2 text-sm">
                        {item.description}
                    </div>
                ))}
            </>) : (<>
                    <div className="p-2 border border-gray-300 rounded-xl text-gray-400 text-xl flex items-center justify-center gap-2">
                    <RiNodeTree />Add subtasks to this node
                </div>
            </>)}


        </div>

    )
}

export default DisplaySubtasks