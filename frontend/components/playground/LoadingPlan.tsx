import { motion } from "framer-motion";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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

const colors = ["#5eead4", "#134e4a", "#0f766e", "#99f6e4", "#14b8a6"];

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const dotVariants = {
    initial: {},
    animate: {
        height: [40, 100, 40],
        transition: {
            repeat: Infinity
        }
    }
};


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
                        console.log(data)
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
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.15,
                duration: 0.95,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="h-screen flex items-center justify-center">
            <motion.div

                variants={containerVariants}
                initial="initial"
                animate="animate"
                style={{
                    display: "flex",
                    gap: 16,
                    height: 100,
                    alignItems: "center"
                }}
            >
                {Array(5)
                    .fill(null)
                    .map((_, index) => {
                        return (
                            <motion.div
                                key={index}
                                variants={dotVariants}
                                style={{
                                    height: 40,
                                    width: 40,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: 20
                                }}
                            />
                        );
                    })}
            </motion.div>
            <div className="m-4 border border-2 border-teal-300 rounded-3xl w-72 shadow-lg shadow-teal-300">
                <div className="p-4 m-4 bg-teal-600 text-teal-100 border border-2 border-teal-500 rounded-3xl">
                    Loading...
                </div>
                <div className="p-4 m-4 border border-2 border-teal-500 rounded-3xl">
                    <h1 className="italic">The base plan serves as the stem from which your ideas sprout.</h1>
                </div>
                <div className="p-4 m-4 border border-2 border-teal-500 rounded-3xl">
                    <h1 className="italic">Subtasks can be added to each node of the stem to alleviate the complexity of each task.</h1>
                </div>
            </div>
        </motion.div>
    )
}

export default LoadingPlan