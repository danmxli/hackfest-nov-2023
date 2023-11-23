import React from "react"
import { FaKey } from "react-icons/fa";

interface EnterApiKeyProps {
    user: any
}

const EnterApiKey: React.FC<EnterApiKeyProps> = ({ user }) => {
    return (
        <div className="p-8 ml-4 mr-4 mb-4 border border-gray-300 shadow rounded-3xl">
            <div>
                <h1 className="mb-2">Currently no API keys registered.</h1>
                <button>
                    <div className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl flex items-center gap-2">
                        <FaKey />Register your key
                    </div>
                </button>
            </div>
        </div>
    )
}

export default EnterApiKey