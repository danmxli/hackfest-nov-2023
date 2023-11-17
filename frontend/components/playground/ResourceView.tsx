import React, { useState, MouseEventHandler } from "react"
import { IoLibrarySharp, IoLink } from "react-icons/io5";

interface Doc {
    title: string
    url: string
}

interface ResourceViewProps {
    baseResources: Doc[]
}

const ResourceView: React.FC<ResourceViewProps> = ({ baseResources }) => {

    const [openResourceView, setOpenResourceView] = useState(false)
    const toggleView: MouseEventHandler<HTMLButtonElement> = () => {
        setOpenResourceView(!openResourceView)
    }

    return (
        <>
            {baseResources.length > 0 && (
                <div className={`fixed bottom-0 left-48 m-2`}>
                    {
                        openResourceView ? (
                            <div className="h-96 w-64 p-2 border border-gray-400 rounded-3xl bg-white flex flex-col">
                                <div className="flex-grow max-h-fit overflow-scroll scrollbar-hide space-y-2">
                                    {baseResources.map((resource, index) => (
                                        <div key={index} >
                                            <a href={resource.url} className="text-sm">

                                                <div className="border text-gray-500 hover:border-teal-400 hover:text-black p-2 rounded-xl break-words">
                                                    <IoLink />{resource.title}
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <button className="mt-2 p-2 pl-8 pr-8 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-2xl text-xs" onClick={toggleView}>
                                        close resources
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button className="p-4 text-2xl border border-2 border-teal-800 hover:text-teal-600 rounded-full bg-white"
                                onClick={toggleView}
                            >
                                <IoLibrarySharp />
                            </button>
                        )
                    }

                </div>
            )}

        </>
    )
}

export default ResourceView