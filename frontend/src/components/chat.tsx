import { AIbubble } from "./aibubble";
import {Userbubble} from "./userbubble";
import {Input} from './input';

export function Chat() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-2/3 flex flex-col items-center">
                <AIbubble />
                <Userbubble />
                <Input />
            </div>
        </div>
    )
}