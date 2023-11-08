'use client'
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import Sidebar from "@/components/Sidebar"
import NewPlan from "@/components/playground/NewPlan"
import LoadingPlan from "@/components/playground/LoadingPlan"
import EditPlan from "@/components/playground/EditPlan"

export default function Home() {
    const router = useRouter()
    const fetchExecuted = useRef(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    // phases for rendering components
    const [phase, setPhase] = useState('NewPlan')
    const [planPrompt, setPlanPrompt] = useState('')

    // update phase and prompt
    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }
    const updatePlanPrompt = (newPrompt: string) => {
        setPlanPrompt(newPrompt)
    }

    // plan history
    const [planHistory, setPlanHistory] = useState(Array<{ _id: string, description: string }>)
    const updatePlanHistory = (newHistory: Array<{ _id: string, description: string }>) => {
        setPlanHistory(newHistory)
    }

    // base data object structure
    interface Task {
        description: string;
        order: string;
        sub_tasks: any[]
    }
    const [baseData, setBaseData] = useState<Task[]>([])
    const updateBaseData = (newData: Task[]) => {
        setBaseData(newData)
    }

    // plan phases interface
    interface PlanPhases {
        [key: string]: React.ReactNode;
    }

    useEffect(() => {
        const getUserInfo = async (id: string) => {
            const requestBody = {
                userId: JSON.parse(id)
            }
            try {
                const response = await fetch('http://127.0.0.1:3000/users/', {
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
                        setUserInfo(data["username"])
                        setPlanHistory(data["history"])
                        setIsAuthenticated(true)
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

            // get userId from localStorage
            const userId = localStorage.getItem('userId')
            if (userId == null || userId == 'null') {
                setIsAuthenticated(false)
                router.push('/'); // Redirect to landing page
            }
            else {
                getUserInfo(userId)
            }
        }

    }, [router]);

    // define object of phases
    const playground: PlanPhases = {
        NewPlan: <NewPlan updatePhase={updatePhase} updatePlanPrompt={updatePlanPrompt} />,
        LoadingPlan: <LoadingPlan updatePhase={updatePhase} planPrompt={planPrompt} updatePlanHistory={updatePlanHistory} updateBaseData={updateBaseData} />,
        RederingPlan: <></>,
        EditPlan: <EditPlan baseData={baseData} />
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="flex">
                    <Sidebar info={userInfo} history={planHistory} updatePhase={updatePhase} updatePlanHistory={updatePlanHistory} updateBaseData={updateBaseData} />
                    <main className="flex-1">
                        {playground[phase]}
                    </main>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}