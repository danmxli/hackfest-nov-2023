'use client'
import { FromLogin } from "@/components/FromLogin"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    return (
        <FromLogin>
            <div className="h-screen">
                homepage in progress.
                
                <button
                    className='text-sm text-stone-600 bg-stone-100 hover:bg-stone-200 p-1 border border-stone-400 rounded'
                    onClick={() => {
                        localStorage.setItem('userId', JSON.stringify(null))
                        router.push('/')
                    }}
                >Sign Out</button>
            </div>
        </FromLogin>
    )
}