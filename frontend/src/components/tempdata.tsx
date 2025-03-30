import { useEffect, useState } from "react";
import axios from "axios";

export function Backend() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:5001")
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error("There was an error fetching the message:", error);
            });
    }
    , []);

    return (
        <div>{message}</div>
    )}

