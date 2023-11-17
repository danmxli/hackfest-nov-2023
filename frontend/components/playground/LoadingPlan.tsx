import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

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
}


const LoadingPlan: React.FC<LoadingPlanProps> = ({ user, updatePhase, planPrompt, promptType, updatePlanHistory, updateBaseData, updatePlanId, updateBaseResources }) => {
    const router = useRouter()
    const fetchExecuted = useRef(false)
    useEffect(() => {
        // async function to fetch baseplan endpoint
        const createBasePlan = async () => {
            const requestBody = {
                email: user.email,
                prompt: planPrompt,
                prompt_type: promptType
            }
            try {
                const response = await fetch('http://127.0.0.1:3000/planning/base', {
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
                        updateBaseData(data["base_plan"])
                        updateBaseResources(data["resources"])
                        updatePlanId(data["base_id"])
                        updatePlanHistory(data["history"])
                        updatePhase('EditPlan')
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
    }, [user.email, planPrompt, promptType, updatePhase, router, updatePlanHistory, updateBaseData, updateBaseResources, updatePlanId])


    return (
        <Loading />
    )
}

export default LoadingPlan