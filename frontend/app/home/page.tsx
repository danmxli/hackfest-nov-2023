'use client'
import { useState, useEffect, useRef } from "react"
import Loading from "@/components/Loading"
import Sidebar from "@/components/Sidebar"
import NewPlan from "@/components/playground/NewPlan"
import LoadingPlan from "@/components/playground/LoadingPlan"
import EditPlan from "@/components/playground/EditPlan"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(function Home({ user }) {
    const fetchExecuted = useRef(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    // phases for rendering components
    const [phase, setPhase] = useState('NewPlan')
    // plan prompt and prompt types prompt_quickstart, prompt_developer, prompt_academia
    const [planPrompt, setPlanPrompt] = useState('')
    const [promptType, setPromptType] = useState('prompt_quickstart')
    const [planId, setPlanId] = useState('')

    // update phase and prompt and planId
    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }
    const updatePlanPrompt = (newPrompt: string) => {
        setPlanPrompt(newPrompt)
    }
    const updatePromptType = (newPromptType: string) => {
        setPromptType(newPromptType)
    }
    const updatePlanId = (newId: string) => {
        setPlanId(newId)
    }

    // plan history
    const [planHistory, setPlanHistory] = useState(Array<{ _id: string, description: string, prompt_type: string }>)
    const updatePlanHistory = (newHistory: Array<{ _id: string, description: string, prompt_type: string }>) => {
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

    // base resources object structure
    interface Doc {
        title: string
        url: string
    }
    const [baseResources, setBaseResources] = useState<Doc[]>([])
    const updateBaseResources = (newResource: Doc[]) => {
        setBaseResources(newResource)
    }

    // plan phases interface
    interface PlanPhases {
        [key: string]: React.ReactNode;
    }

    useEffect(() => {
        const getUserInfo = async () => {
            console.log(user)
            const requestBody = {
                email: user.email
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
            getUserInfo()
        }

    }, [user]);

    // define object of phases
    const playground: PlanPhases = {
        NewPlan: <NewPlan updatePhase={updatePhase} updatePlanPrompt={updatePlanPrompt} promptType={promptType} updatePromptType={updatePromptType} />,
        LoadingPlan: <LoadingPlan user={user} updatePhase={updatePhase} planPrompt={planPrompt} promptType={promptType} updatePlanHistory={updatePlanHistory} updateBaseData={updateBaseData} updatePlanId={updatePlanId} updateBaseResources={updateBaseResources} />,
        RederingPlan: <></>,
        EditPlan: <EditPlan user={user} baseData={baseData} updateBaseData={updateBaseData} planId={planId} baseResources={baseResources} />
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="flex">
                    <Sidebar user={user} info={userInfo} history={planHistory} updatePhase={updatePhase} updatePlanId={updatePlanId} updatePlanHistory={updatePlanHistory} updateBaseData={updateBaseData} planId={planId} updateBaseResources={updateBaseResources} />
                    <main className="flex-1">
                        {playground[phase]}
                    </main>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
})