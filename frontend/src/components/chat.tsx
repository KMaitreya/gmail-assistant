import { AIbubble } from "./aibubble";
import {Userbubble} from "./userbubble";
import {Input} from './input';
import {useState} from 'react';

export function Chat() {

    const [messages, setMessages]=useState<string[]>([]);

    const handleSendMessage=(message:String)=>{
        setMessages((prevMessages) => [...prevMessages, message.toString()]); // Update the messages state with the new message
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-2/3 flex flex-col items-center">
                <AIbubble />
                {messages.map((msg)=>
                    <Userbubble message={msg}/>
                )}
                
                <Input onSendMessage={handleSendMessage}/>
            </div>
        </div>
    )
}