import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { AiOutlineSend } from 'react-icons/ai'

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const sendMessage = () => {
        if (inputValue.trim() !== '') {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="grid grid-cols-12 items-center p-2 bg-gray-200 rounded-2xl w-full">
            <div className='col-span-10'>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                />
            </div>

            <div className='col-span-2 flex justify-center'>
                <button
                    onClick={sendMessage}
                    className="p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none"
                >
                    <AiOutlineSend/>
                </button>
            </div>


        </div>
    );
};

export default ChatInput;
