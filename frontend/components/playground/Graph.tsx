import React, { useCallback, useMemo } from "react";
import ReactFlow, {
    Controls,
    addEdge,
    Background,
    useNodesState,
    useEdgesState
} from "reactflow";

import "reactflow/dist/style.css";

interface Task {
    description: string;
    order: string;
    sub_tasks: any[];
}

interface GraphProps {
    baseData: Task[];
}

const initialNodes: any[] = [];
const initialEdges: any[] = [];

const buildInitialNodesAndEdges = (baseData: Task[]) => {
    // Clear the initialNodes and initialEdges arrays
    initialNodes.length = 0;
    initialEdges.length = 0;

    baseData.forEach((task) => {
        let coeff = parseInt(task.order);
        initialNodes.push({
            id: task.order,
            data: { label: task.description },
            position: { x: 200 * coeff, y: 100 },
        });

        let position = parseInt(task.order);
        if (position + 1 <= baseData.length) {
            initialEdges.push({
                id: `e${position}-${position + 1}`,
                source: `${position}`,
                target: `${position + 1}`,
            });
        }
    });
};

const Graph: React.FC<GraphProps> = ({ baseData }) => {
    // Create the initialNodes and initialEdges arrays once
    useMemo(() => {
        buildInitialNodesAndEdges(baseData);
    }, [baseData]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default Graph;
