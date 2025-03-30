export function Userbubble(){
    return (
        <div className="flex items-center space-x-4 w-full mt-4">
            <div className="border-2 border-gray-200 text-gray-800 p-3 rounded-lg max-w-full flex-grow text-right">
                Test message from user
            </div>
            <div className="w-10 h-10 rounded-full">
                <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png" // Example AI Logo
                alt="AI Logo"
                className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}