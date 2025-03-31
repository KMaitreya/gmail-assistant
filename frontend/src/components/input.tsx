import { SetStateAction, useState } from "react";
import axios from "axios";

export function Input({onSendMessage}: {onSendMessage?: (message: string) => void}) {

    const [message, setMessage] = useState("");
    
    const handleChange=(e: { target: { value: SetStateAction<string>; }; }) => {
        setMessage(e.target.value);
    };

    // function to handle user input
    const handleSubmit = async (e: { preventDefault: () => void; })=>{
        e.preventDefault();

        if (message.trim()){
            try{
                if (onSendMessage) {
                    onSendMessage(message);
                }
            }
            catch (error){
                console.error("Error sending message to backend:", error);
            }
        }
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full m-4">
            <label htmlFor="inputField" className="sr-only">Enter your message</label>
            <div className="relative">
                <input 
                type="text" 
                id="inputField" 
                value={message}
                onChange={handleChange}
                className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter your message" 
                required 
                />
                <button 
                type="submit" 
                className="text-white absolute right-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Go
                </button>
            </div>
        </form>

    )
}