import { SetStateAction, useState, useRef, useEffect } from "react";

export function Input({onSendMessage, setInputHeight}: {onSendMessage?: (message: string) => void; setInputHeight: (height: number) => void;}) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [message, setMessage] = useState("");
    
    const handleChange=(e: { target: { value: SetStateAction<string>;}; }) => {
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

    useEffect(() => {
        if (inputRef.current) {
          setInputHeight(inputRef.current.offsetHeight);
        }
      }, []);

    return (
        <div>
            <div className=" fixed h-screen"></div>
            <form onSubmit={handleSubmit} className=" bg-white fixed bottom-0 left-1/2 w-2/3 m-4 z-50 transform -translate-x-1/2">
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
        </div>
    )
}