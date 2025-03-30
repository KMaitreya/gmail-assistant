export function AIbubble(){
    return (
        <div className="flex items-center space-x-4 w-full mt-4">
            <div className="w-10 h-10 rounded-full">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" // Example AI Logo
                alt="AI Logo"
                className="w-full h-full object-cover"
                />
            </div>
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-full break-words flex-grow">
                Test message from AI
            </div>
        </div>
    )
} 