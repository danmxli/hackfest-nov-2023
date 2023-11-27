import { BiLogoGmail } from "react-icons/bi";
import { RiNotionFill } from "react-icons/ri";

const Integrations = () => {
    return (
        <div className="p-8 ml-4 mr-4 mb-4 border border-gray-300 shadow rounded-3xl max-h-96 overflow-scroll scrollbar-hide relative">
            <h1 className="mb-2">Your third party integrations:</h1>
            <div className="inline-grid gap-2">
                <button className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl flex items-center gap-2">
                    <BiLogoGmail /><h1>Gmail <span className="text-xs bg-orange-200 text-orange-800 p-1 pl-4 pr-4 rounded-xl"><code>BETA</code></span></h1>
                    
                </button>
                <button className="p-2 pl-8 pr-8 border border-gray-300 hover:bg-gray-100 rounded-xl flex items-center gap-2">
                    <RiNotionFill /><h1>Notion <span className="text-xs bg-orange-200 text-orange-800 p-1 pl-4 pr-4 rounded-xl"><code>BETA</code></span></h1>
                </button>
            </div>

        </div>
    )
}

export default Integrations