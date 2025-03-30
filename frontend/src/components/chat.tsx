import { AIbubble } from "./aibubble";
import {Userbubble} from "./userbubble";
import {Input} from './input';
import {useState} from 'react';
import axios from "axios";

export function Chat() {

    const [messages, setMessages]=useState<{text: string, sender: 'user'| 'ai'}[]>([]);

    const handleSendMessage=async (message:String)=>{
        setMessages((prevMessages) => [...prevMessages, {text: message.toString(), sender: 'user'}]); // Update the messages state with the new message

        try{
            const response= await axios.post("http://127.0.0.1:5001/message", {message}); // Send the message to the backend
            const aires=response.data.message;
            setMessages((prevMessages) => [...prevMessages, {text: aires, sender: 'ai'}]); // Update the messages state with the AI response
        }
        catch(error){
            console.error("Error sending message to backend:", error);
            // Optionally, you can handle the error by showing a message to the user
            setMessages((prevMessages) => [...prevMessages, {text: "Error: Could not get a response from the AI.", sender: 'ai'}]); // Add an error message from AI
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-2/3 flex flex-col items-center">
                {messages.map((msg)=>{
                    if (msg.sender=='user'){
                        return <Userbubble message={msg.text}/>
                    }
                    else{
                        return <AIbubble message={msg.text} />
                    }
            })}
                <Input onSendMessage={handleSendMessage}/>
            </div>
        </div>
    )
}