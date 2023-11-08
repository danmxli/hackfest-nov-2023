import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "../Loading";

// base data object structure
interface Task {
    description: string;
    order: string;
    sub_tasks: any[]
}

interface LoadingPlanProps {
    updatePhase: (newPhase: string) => void;
    planPrompt: string;
    updatePlanHistory: (newHistory: Array<{ _id: string, description: string }>) => void;
    updateBaseData: (newData: Task[]) => void;
}


const LoadingPlan: React.FC<LoadingPlanProps> = ({ updatePhase, planPrompt, updatePlanHistory, updateBaseData }) => {
    const router = useRouter()
    const fetchExecuted = useRef(false)
    useEffect(() => {
        // async function to fetch baseplan endpoint
        const createBasePlan = async (id: string) => {
            const requestBody = {
                userId: JSON.parse(id),
                prompt: planPrompt
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
                        // console.log(data)
                        updateBaseData(data["base_plan"])
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
            const userId = localStorage.getItem('userId')
            if (userId == null || userId == 'null') {
                router.push('/'); // Redirect to landing page
            }
            else {
                createBasePlan(userId)
            }

        }
    }, [planPrompt, updatePhase, router, updatePlanHistory, updateBaseData])


    return (
        <Loading />
    )
}

export default LoadingPlan