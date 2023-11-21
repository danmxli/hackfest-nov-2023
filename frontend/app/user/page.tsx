'use client'
import { useState, useEffect, useRef } from "react"
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import TopProfile from "@/components/userinfo/TopProfile";
import TokenHistory from "@/components/userinfo/TokenHistory";
import Loading from "@/components/Loading";

export default withPageAuthRequired(function User({ user }) {
    const fetchExecuted = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tokenCount, setTokenCount] = useState(0)

    interface logContents {
        details: string,
        time_called: string
        tokens_used: number,
        type: string
    }
    const [tokenLogs, setTokenLogs] = useState<logContents[]>([])

    const test = async () => {
        if (user) {
            const requestBody = {
                name: user.name,
                email: user.email,
            }
            setIsLoading(true)
            try {
                const response = await fetch('http://127.0.0.1:3000/users/access', {
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
            test()
        }
    })
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid items-center justify-center w-screen h-screen overflow-y-scroll gap-3">
                    <TopProfile user={user} tokenCount={tokenCount} />
                    <TokenHistory tokenLogs={tokenLogs} />
                </div >
            )}
        </>

    )
})

