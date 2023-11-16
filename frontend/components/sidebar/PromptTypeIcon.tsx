import React from "react";
import { FaBolt, FaCodeBranch, FaBookOpen } from "react-icons/fa6";
import { AiOutlineNodeIndex } from "react-icons/ai"

interface PromptTypeIconProps {
    promptType: string
}

const PromptTypeIcon: React.FC<PromptTypeIconProps> = ({ promptType }) => {
    switch (promptType) {
        case 'prompt_quickstart':
            return (
                <FaBolt />
            );
        case 'prompt_developer':
            return (
                <FaCodeBranch />
            );
        case 'prompt_academia':
            return (
                <FaBookOpen />
            );
        default:
            return (
                <AiOutlineNodeIndex />
            ); 
    }
};

export default PromptTypeIcon