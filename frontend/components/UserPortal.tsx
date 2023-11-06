'use client'
import SignIn from "./portal/SignIn"
import SignUp from "./portal/SignUp"
import { useState } from "react"

interface PortalPhases {
    [key: string]: React.ReactNode;
}

const UserPortal = () => {
    const [phase, setPhase] = useState('SignUp')

    const updatePhase = (newPhase: string) => {
        setPhase(newPhase)
    }

    const portal: PortalPhases = {
        SignUp: <SignUp updatePhase={updatePhase} />,
        SignIn: <SignIn updatePhase={updatePhase} />
    }

    return (
        <div>
            {portal[phase]}
        </div>
    )
}

export default UserPortal