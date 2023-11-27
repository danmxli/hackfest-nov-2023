'use client'
import React, { useState, useEffect, useRef } from "react"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TopProfile from "@/components/userinfo/TopProfile";
import TokenHistory from "@/components/userinfo/TokenHistory";
import EnterApiKey from "@/components/userinfo/EnterApiKey";
import Integrations from "@/components/userinfo/Integrations";
import Loading from "@/components/playground/load/Loading";

export default withPageAuthRequired(function User({ user }) {
    const fetchExecuted = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tokenCount, setTokenCount] = useState(0)
    // phases are Logs, Insights, Buy
    const [phase, setPhase] = useState('Logs')
    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }

    interface logContents {
        details: string,
        time_called: string
        tokens_used: number,
        type: string
    }
    const [tokenLogs, setTokenLogs] = useState<logContents[]>([])

    const userAccess = async () => {
        if (user) {
            const requestBody = {
                name: user.name,
                email: user.email,
            }
            setIsLoading(true)
            try {
                const response = await fetch('https://seepickle-production.up.railway.app/users/access', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setTokenLogs(data.token_history)
                        setTokenCount(data.tokens)
                        setIsLoading(false)
                    }
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Fetch request error:', error);
            }
        }
    }
    useEffect(() => {
        if (!fetchExecuted.current) {
            fetchExecuted.current = true
            userAccess()
        }
    })

    // user dashboard phases
    interface DashboardPhases {
        [key: string]: React.ReactNode;
    }
    const manageUser: DashboardPhases = {
        Logs: <TokenHistory tokenLogs={tokenLogs} />,
        Integrations: <Integrations />,
        Buy: <EnterApiKey user={user} />
    }
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid items-center justify-center w-screen h-screen overflow-y-scroll gap-3">
                    <TopProfile user={user} tokenCount={tokenCount} phase={phase} updatePhase={updatePhase} />
                    {manageUser[phase]}
                </div >
            )}
        </>

    )
})

