import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CgExtensionRemove } from 'react-icons/cg'
import { RiNodeTree } from 'react-icons/ri'
import { MdOutlineExpandCircleDown } from "react-icons/md";
import './custom.scss'

interface DisplaySubtasksProps {
    user: any
    subtaskItems: {
        _id: string;
        title: string;
        description: string;
    }[]
    planId: string
    nodeData: any
    updateLocalSubtasks: (newLocalSubtask: {
        _id: string;
        title: string;
        description: string;
    }[]) => void
}

const DisplaySubtasks: React.FC<DisplaySubtasksProps> = ({ user, subtaskItems, planId, nodeData, updateLocalSubtasks }) => {

    const router = useRouter()
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

    const removeSubtask = async (id: string) => {
        const requestBody = {
            email: user.email,
            planId: planId,
            action: "remove",
            taskDescription: nodeData,
            subtaskId: id
        }
        console.log(requestBody)

        try {
            const response = await fetch('https://seepickle-production.up.railway.app/planning/edit_subtask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data)
                    updateLocalSubtasks(data["subtasks"])
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    return (
        <div className="mt-2 p-4 overflow-scroll scrollbar-hide border border-gray-300 shadow rounded-2xl font-light grid gap-2">
            {subtaskItems.length > 0 ? (<>
                {subtaskItems.map((item) => (
                    <div
                        key={item._id}
                        className="p-2 grid grid-cols-12 border border-gray-300 hover:border-gray-400 rounded-xl text-sm"
                    >
                        <button
                            className="flex items-center justify-start gap-1 col-span-11"
                            onClick={() => toggleExpand(item._id)}
                        >
                            <>
                                <MdOutlineExpandCircleDown
                                    className={`text-teal-600 ${expandedItems.includes(item._id) ? 'rotate-180' : ''
                                        }`}
                                />
                                {item.title}
                            </>
                        </button>
                        <div className="flex justify-end gap-1">
                            <button
                                className="text-gray-400 hover:text-red-300"
                                onClick={() => {
                                    removeSubtask(item._id);
                                }}
                            >
                                <CgExtensionRemove />
                            </button>
                        </div>
                        {expandedItems.includes(item._id) && (
                            <div
                                className="col-span-12 customHtmlStyles"
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            />
                        )}
                    </div>
                ))}
            </>) : (<>
                <div className="p-2 border border-gray-300 rounded-xl text-gray-400 text-sm flex items-center justify-center gap-2">
                    <RiNodeTree />Add subtasks to this node
                </div>
            </>)}


        </div>

    )
}

export default DisplaySubtasks