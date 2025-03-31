export function AIbubble({ message }: { message: string }) {
    return (
        <div className="flex items-start space-x-4 w-full mt-4">
            {/* AI logo container with fixed size */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                    src="https://img.icons8.com/ios-filled/50/mailbox-opened-flag-down.png" // Example AI Logo
                    alt="AI Logo"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* AI message bubble */}
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-full break-words flex-grow">
                <p className="whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
}

