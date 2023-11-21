import { useRouter } from "next/navigation";

const OutOfTokens = () => {
    const router = useRouter()
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-8 m-4 border-2 border-teal-800 rounded-3xl">
                <h1 className="text-3xl">Not enough tokens to create a plan.</h1>
                <button className="mt-5 p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl"
                    onClick={() => {
                        router.push('/user')
                    }}
                >
                    Get more tokens
                </button>
            </div>
        </div>
    )
}

export default OutOfTokens