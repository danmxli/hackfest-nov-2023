import React, { useState, ChangeEvent, MouseEventHandler } from 'react';
import { AiOutlineSend, AiOutlineLoading3Quarters } from 'react-icons/ai'

interface ChatInputProps {
    inputValue: string
    updateInputValue: (newValue: string) => void
    fetchResponse: (userInput: string) => void
    isLoading: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ inputValue, updateInputValue, fetchResponse, isLoading }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateInputValue(event.target.value);
    };

    const handleFetchResponse: MouseEventHandler<HTMLButtonElement> = () => {
        fetchResponse(inputValue)
    }

    return (
        <div className="grid grid-cols-12 gap-2 items-center p-2 bg-gray-100 shadow rounded-2xl w-full">
            <div className='col-span-10'>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full p-2 bg-white border border-gray-500 rounded-md focus:outline-none"
                />
            </div>

            {isLoading ? (
                <div className="col-span-2 flex justify-center p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            ) : (
                <>
                    {inputValue !== '' ? (
                        <button
                            onClick={handleFetchResponse}
                            className="col-span-2 flex justify-center p-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none"
                        >
                            <AiOutlineSend />
                        </button>
                    ) : (
                        <div
                            className="col-span-2 flex justify-center p-2 bg-gray-300 text-white rounded-md"
                        >
                            <AiOutlineSend />
                        </div>
                    )}

                </>

            )}
        </div>
    );
};

export default ChatInput;
