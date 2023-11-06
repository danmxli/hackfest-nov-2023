'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, useState, useEffect, useRef } from 'react';

interface FromLoginProps {
    children: ReactNode;
}

export function FromLogin({ children }: FromLoginProps) {
    const router = useRouter();
    const fetchExecuted = useRef(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        if (!fetchExecuted.current) {
            fetchExecuted.current = true

            // get userId from localStorage
            const userId = localStorage.getItem('userId')
            console.log(userId)
            if (userId == null || userId == 'null') {
                setIsAuthenticated(false)
                router.push('/'); // Redirect to landing page
            }
            else {
                setIsAuthenticated(true)
            }
        }

    }, [router]);

    return isAuthenticated ? children : null;
}