import React, { useState } from "react";
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { CgExtensionAdd, CgExtensionRemove } from 'react-icons/cg'

// base data object structure
interface Task {
    description: string;
    order: string;
    sub_tasks: any[];
}

interface ChangeBaseTasksProps {
    baseTasks: Task[];

    // function to update baseTasks
    editTask: (selectedTask: Task) => void;
    removeTask: (selectedTask: Task) => void;
    addTask: (newTask: Task, placeHolder: Task, position: number) => void;
}

const ChangeBaseTasks: React.FC<ChangeBaseTasksProps> = ({ baseTasks, editTask, removeTask, addTask }) => {

    // toggle expanded description
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const toggleExpand = (itemId: string) => {
        setExpandedItems((prevExpandedItems) => {
            if (prevExpandedItems.includes(itemId)) {
                return prevExpandedItems.filter((id) => id !== itemId);
            } else {
                return [...prevExpandedItems, itemId];
            }
        });
    };

    return (
        <div>
            <div className="space-y-3">
                {baseTasks.map((item, index) => (
                    <div key={index} className="p-3 border border-gray-600 bg-white rounded-xl">
                        <p className="whitespace-break-spaces font-light">{item.order}. {item.description}</p>
                        <div className="mt-3 text-3xl inline-flex items-center gap-3 bg-teal-200 rounded-3xl p-1 pl-6 pr-6">
                            <button>
                                <MdOutlineExpandCircleDown />
                            </button>
                            <button>
                                <TbEdit />
                            </button>
                            <button>
                                <CgExtensionRemove />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChangeBaseTasks