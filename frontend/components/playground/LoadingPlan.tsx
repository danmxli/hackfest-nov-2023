import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "./load/Loading";
import MakeChanges from "./load/MakeChanges";

// base data object structure
interface Task {
    description: string;
    order: string;
    sub_tasks: any[];
}
interface Doc {
    title: string
    url: string
}

interface LoadingPlanProps {
    user: any
    updatePhase: (newPhase: string) => void;
    planPrompt: string;
    promptType: string;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
    updatePlanId: (newId: string) => void;
    updateBaseResources: (newResource: Doc[]) => void;
    updateTokenCount: (newCount: number) => void;
}


const LoadingPlan: React.FC<LoadingPlanProps> = ({ user, updatePhase, planPrompt, promptType, updatePlanHistory, updateBaseData, updatePlanId, updateBaseResources, updateTokenCount }) => {
    const router = useRouter()
    const fetchExecuted = useRef(false)

    // Load, MakeChanges
    const [planCreationState, setPlanCreationState] = useState('Load')
    const [rawResponse, setRawResponse] = useState('')
    const [baseTasks, setBaseTasks] = useState<Task[]>([])
    const [resources, setResources] = useState<Doc[]>([])

    // function to update baseTasks
    const editTask = (selectedTask: Task) => {

    }
    const removeTask = (selectedTask: Task) => {

    }
    const addTask = (newTask: Task, placeHolder: Task, position: number) => {

    }


    // LoadPhases
    interface LoadPhases {
        [key: string]: React.ReactNode;
    }

    useEffect(() => {
        // async function to fetch baseplan endpoint
        const createBasePlan = async () => {
            const requestBody = {
                email: user.email,
                prompt: planPrompt,
                prompt_type: promptType
            }
            try {
                const response = await fetch('https://seepickle-production.up.railway.app/loading/base', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        if (data["message"] === "not enough tokens") {
                            updatePhase('OutOfTokens')
                        }
                        else {
                            console.log(data)
                            setRawResponse(data["raw_text"])
                            setBaseTasks(data["base_tasks"])
                            setResources(data["resources"])
                            setPlanCreationState('MakeChanges')
                        }

                    }
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Fetch request error:', error);
            }
        }

        if (!fetchExecuted.current) {
            fetchExecuted.current = true
            createBasePlan()
        }
    }, [user.email, planPrompt, promptType, updatePhase, router, updatePlanHistory, updateBaseData, updateBaseResources, updatePlanId, updateTokenCount])

    const phases: LoadPhases = {
        Load: <Loading />,
        MakeChanges: <MakeChanges user={user} planPrompt={planPrompt} promptType={promptType} rawResponse={rawResponse} baseTasks={baseTasks} resources={resources} editTask={editTask} removeTask={removeTask} addTask={addTask} updatePhase={updatePhase} updatePlanHistory={updatePlanHistory} updateBaseData={updateBaseData} updatePlanId={updatePlanId} updateBaseResources={updateBaseResources} updateTokenCount={updateTokenCount} />
    }

    return (
        phases[planCreationState]
    )
}

export default LoadingPlan