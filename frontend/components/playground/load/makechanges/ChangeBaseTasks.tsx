import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
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
    updateLocalTasks: (newTasks: Task[]) => void;
    editTask: (selectedTask: Task) => void;
}

const ChangeBaseTasks: React.FC<ChangeBaseTasksProps> = ({ baseTasks, updateLocalTasks, editTask}) => {

    // 
    const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedTasks((prevExpandedTasks) => {
            if (prevExpandedTasks.includes(index)) {
                return prevExpandedTasks.filter((i) => i !== index);
            } else {
                return [...prevExpandedTasks, index];
            }
        });
    };

    return (
        <div>
            <div className="space-y-3">
                {baseTasks.map((item, index) => (
                    <div key={index} className="p-3 bg-teal-50 rounded-xl shadow-lg">
                        <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {item.order}. {item.description}
                        </p>
                        <div className="mt-3 text-2xl inline-flex items-center gap-1">
                            <button onClick={() => toggleExpand(index)}>
                                {
                                    expandedTasks.includes(index) ? (<MdExpandLess className="hover:text-teal-800" />) : (<MdExpandMore className="hover:text-teal-800" />)
                                }
                            </button>
                            <button>
                                <TbEdit />
                            </button>
                        </div>
                        {expandedTasks.includes(index) && (
                            <div className="p-3 border border-teal-600 bg-white font-light rounded-xl">
                                {item.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChangeBaseTasks