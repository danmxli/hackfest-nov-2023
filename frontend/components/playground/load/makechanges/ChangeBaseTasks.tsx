'use client'
import React, { useState, ChangeEvent } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

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

const ChangeBaseTasks: React.FC<ChangeBaseTasksProps> = ({ baseTasks, updateLocalTasks, editTask }) => {

    // 
    const [expandedTasks, setExpandedTasks] = useState<number[]>([]);

    // editing index
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const handleEditClick = (index: number, description: string) => {
        setNewDescription(description)
        setEditingIndex(index);
    };

    // update newDescription from input element
    const [newDescription, setNewDescription] = useState('')
    const handleUserInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(e.target.value)
    }

    // TODO save the edit
    const handleSaveEdit = (index: number, updatedDescription: string) => {
        // Update the baseTasks array with the new description
        const updatedTasks = baseTasks.map((task, i) =>
            i === index ? { ...task, description: updatedDescription } : task
        );

        // Update the local state and clear the editing state
        updateLocalTasks(updatedTasks);
        setEditingIndex(null);
    };

    // expand description
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
                    <div key={index} className="p-3 bg-white rounded-xl shadow-lg">
                        {editingIndex === index ? (
                            <>
                                <div className="mt-3">
                                    <div className="p-3 bg-white border border-teal-600 rounded-xl">
                                        <textarea
                                            value={newDescription}
                                            onChange={handleUserInput}
                                            className="w-full focus:outline-none h-36 font-light"
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                className="p-0.5 pl-6 pr-6 border border-gray-300 hover:bg-gray-100 rounded-xl"
                                                onClick={() => {
                                                    handleSaveEdit(index, newDescription)
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="p-0.5 pl-6 pr-6 border border-gray-300 hover:bg-gray-100 rounded-xl"
                                                onClick={() => {
                                                    setEditingIndex(null);
                                                }}
                                            >
                                                Discard changes
                                            </button>
                                        </div>

                                    </div>


                                </div>
                            </>
                        ) : (
                            <div className="p-3 bg-teal-50 text-teal-950 rounded-xl">
                                <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    {item.order}. {item.description}
                                </p>
                            </div>

                        )}

                        <div className="mt-3 text-2xl inline-flex items-center gap-1">
                            <button onClick={() => toggleExpand(index)}>
                                {expandedTasks.includes(index) ? (
                                    <MdExpandLess className="hover:text-teal-800" />
                                ) : (
                                    <MdExpandMore className="hover:text-teal-800" />
                                )}
                            </button>
                            {editingIndex !== index && (
                                // Display the edit button only if not currently editing
                                <button onClick={() => handleEditClick(index, item.description)}>
                                    <TbEdit />
                                </button>
                            )}
                        </div>
                        {expandedTasks.includes(index) && (
                            <div className="p-3 bg-teal-900 text-teal-200 font-light rounded-xl">
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