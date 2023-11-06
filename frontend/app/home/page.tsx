'use client'
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"
import Sidebar from "@/components/Sidebar"

export default function Home() {
    const router = useRouter()
    const fetchExecuted = useRef(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userInfo, setUserInfo] = useState('')

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

    return (
        <>
            {isAuthenticated ? (
                <div className="flex-col">
                    <Sidebar info={userInfo}/>
                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}