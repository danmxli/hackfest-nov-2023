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
        <div className="p-8 ml-4 mr-4 border border-gray-300 shadow rounded-3xl">
            <h1 className="text-2xl mb-4">Token usage logs</h1>
            {tokenLogs.length > 0 ? (
                <table className="table-auto">
                    <thead className="">
                        <tr className="border-b">
                            <th className="py-2 px-4">Time Called</th>
                            <th className="py-2 px-4">Type</th>
                            <th className="py-2 px-4">Details</th>
                            <th className="py-2 px-4">Tokens Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokenLogs.map((item, index) => (
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