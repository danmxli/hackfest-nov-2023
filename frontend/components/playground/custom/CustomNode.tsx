import React, { memo, ReactNode, MouseEventHandler } from "react";
import { Handle, NodeProps, Position } from 'reactflow';

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
        <div className="p-4 bg-teal-50/30 border border-2 border-teal-400 rounded-3xl">
            <div className="w-80 p-4 bg-white border border-teal-600 rounded-3xl ">
                {data.label}
                <Handle type="target" position={Position.Left} className="!bg-teal-400" />
                <Handle type="source" position={Position.Right} className="!bg-teal-400" />
            </div>
            <button
                onClick={handleButtonClick}
                className="mt-4 p-4 bg-teal-800 hover:bg-teal-700 text-teal-200 rounded-3xl">
                Subtasks
            </button>
        </div>
    )
})

// Set the displayName for the component
CustomNode.displayName = "CustomNode";

export default CustomNode;
