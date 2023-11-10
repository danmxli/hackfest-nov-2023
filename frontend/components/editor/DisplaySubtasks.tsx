import React from "react";
import { useRouter } from "next/navigation";
import { CgExtensionRemove } from 'react-icons/cg'
import { RiNodeTree } from 'react-icons/ri'

interface DisplaySubtasksProps {
    subtaskItems: {
        _id: string;
        description: string;
    }[]
    planId: string
    nodeData: any
    updateLocalSubtasks: (newLocalSubtask: {
        _id: string;
        description: string;
    }[]) => void
}

const DisplaySubtasks: React.FC<DisplaySubtasksProps> = ({ subtaskItems, planId, nodeData, updateLocalSubtasks }) => {

    const router = useRouter()

    const removeSubtask = async (id: string) => {
        const userId = localStorage.getItem('userId')
        if (userId === null || userId === 'null') {
            router.push('/'); // Redirect to landing page
        }
        else {
            const requestBody = {
                userId: JSON.parse(userId),
                planId: planId,
                action: "remove",
                taskDescription: nodeData,
                subtaskId: id
            }
            console.log(requestBody)

            try {
                const response = await fetch('http://127.0.0.1:3000/planning/edit_subtask', {
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
    }

    return (
        <div className="mt-2 p-4 overflow-scroll scrollbar-hide border border-teal-600 rounded-2xl font-light grid gap-2">
            {subtaskItems.length > 0 ? (<>
                {subtaskItems.map(item => (
                    <div key={item._id}
                        className="p-2 grid grid-cols-12 border border-gray-300 hover:border-gray-400 rounded-xl text-sm">
                        <div className="col-span-11">
                            {item.description}
                        </div>
                        <div className="flex justify-end">
                            <button className="text-gray-400 hover:text-red-300"
                                onClick={() => {
                                    removeSubtask(item._id)
                                }}
                            ><CgExtensionRemove /></button>
                        </div>
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