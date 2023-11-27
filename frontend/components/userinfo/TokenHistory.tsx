import React from "react"

interface TokenHistoryProps {
    tokenLogs: {
        details: string,
        time_called: string
        tokens_used: number,
        type: string
    }[]
}

const TokenHistory: React.FC<TokenHistoryProps> = ({ tokenLogs }) => {
    return (
        <div className="p-8 pt-0 ml-4 mr-4 mb-4 border border-gray-300 shadow rounded-3xl max-h-96 overflow-scroll scrollbar-hide relative">
            {tokenLogs.length > 0 ? (
                <table className="table-auto">
                    <thead className="sticky top-0 bg-white">
                        <tr className="border-b">
                            <th className="pt-8 pb-2 px-4"><h1 className="bg-gray-100 p-2 rounded-2xl font-medium">Time called</h1></th>
                            <th className="pt-8 pb-2 px-4"><h1 className="bg-gray-100 p-2 rounded-2xl font-medium">Type</h1></th>
                            <th className="pt-8 pb-2 px-4"><h1 className="bg-gray-100 p-2 rounded-2xl font-medium">Details</h1></th>
                            <th className="pt-8 pb-2 px-4"><h1 className="bg-gray-100 p-2 rounded-2xl font-medium">Tokens used</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenLogs.slice().reverse().map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">{item.time_called}</td>
                                <td className="py-2 px-4">{item.type}</td>
                                <td className="py-2 px-4">{item.details}</td>
                                <td className="py-2 px-4">{item.tokens_used} tokens used</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No logs available.</p>
            )}
        </div>


    )
}

export default TokenHistory