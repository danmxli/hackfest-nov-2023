'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface FromLoginProps {
    children: ReactNode;
}

export function FromLogin({ children }: FromLoginProps) {
    const router = useRouter();
    const fetchExecuted = useRef(false)
    const isAuthenticated = false

    useEffect(() => {
        if (!fetchExecuted.current) {
            fetchExecuted.current = true
            console.log('hi')
            if (!isAuthenticated) {
                router.push('/'); // Redirect to landing page
            }
        }

    }, [isAuthenticated, router]);

    return isAuthenticated ? children : null;
}