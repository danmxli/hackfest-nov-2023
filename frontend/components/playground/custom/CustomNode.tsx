import React, { memo, ReactNode, MouseEventHandler } from "react";
import { Handle, NodeProps, Position } from 'reactflow';
import { RiNodeTree } from "react-icons/ri";

export type CustomNodeData = {
    label: string
    subtask: ReactNode
    btnAction: (isOpen: boolean, newData: any, newSubtasks: any) => void;
}

const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
    // set editor to open state
    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        data.btnAction(true, data.label, data.subtask);
    };

    return (
        <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-3xl">
            <div className="w-80 p-6 bg-white border border-teal-600 rounded-3xl ">
                {data.label}
                <Handle type="target" position={Position.Left} className="!bg-teal-600" />
                <Handle type="source" position={Position.Right} className="!bg-teal-600" />
            </div>
            <button
                onClick={handleButtonClick}
                className="mt-6 p-2 pl-6 pr-6 bg-gray-200 hover:bg-teal-100 flex items-center gap-2 rounded-3xl">
                <RiNodeTree />Subtasks
            </button>
        </div>
    )
})

// Set the displayName for the component
CustomNode.displayName = "CustomNode";

export default CustomNode;
