import { Empty } from "./empty";
import { AIbubble } from "./aibubble";
import { Userbubble } from "./userbubble";
import { Input } from './input';
import { useEffect, useState } from 'react';
import axios from "axios";
import { onAuthChange } from "../firebase"; // Ensure you have the correct import for Firebase auth state change

export function Chat() {
    const [inputHeight, setInputHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'ai' }[]>([]);
    const [userImg, setUserImg] = useState<string | null>(null);

    useEffect(() => {
        onAuthChange((user) => {
            if (user) {
                setUserImg(user.photoURL);
            } else {
                setUserImg(null);
            }
            setMessages([]);
        });
    }, []);

    const handleSendMessage = async (message: string) => {
        setMessages((prevMessages) => [...prevMessages, { text: message.toString(), sender: 'user' }]);
        setLoading(true);

        // Add a temporary AI message (empty text)
        setMessages((prevMessages) => [...prevMessages, { text: "", sender: "ai" }]);

        try {
            const response = await axios.post("http://127.0.0.1:5001/message", { message });
            const aires = response.data.message;

            // Replace last AI message with actual response
            setMessages((prevMessages) =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1 ? { text: aires, sender: "ai" } : msg
                )
            );
        } catch (error) {
            console.error("Error sending message to backend:", error);
            setMessages((prevMessages) =>
                prevMessages.map((msg, index) =>
                    index === prevMessages.length - 1 ? { text: "Error: Could not get a response from the AI.", sender: "ai" } : msg
                )
            );
        } finally {
            setLoading(false);
        }
    };

    const renderMessages = () => {
        if (messages.length === 0) {
            return <Empty />;
        } else {
            return messages.map((msg, index) => {
                if (msg.sender === 'user') {
                    return <Userbubble message={msg.text} img={userImg || ''} />;
                }
                return <AIbubble message={msg.text} loading={loading && index === messages.length - 1} />;
            });
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-2/3 flex flex-col items-center">
                <div className="w-full fixed bg-dark-100 z-100 b-100"></div>
                {renderMessages()}
                <div className="m-4" style={{ height: inputHeight }} />
                <div className="fixed bottom-0 w-full bg-white z-40" style={{ height: inputHeight }} />
                <Input onSendMessage={handleSendMessage} setInputHeight={setInputHeight} />
            </div>
        </div>
    );
}
