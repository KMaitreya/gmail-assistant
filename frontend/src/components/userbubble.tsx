export function Userbubble({message}: {message: string}) {
    return (
        <div className="flex items-center space-x-4 w-full mt-4">
            <div className="w-10 h-10 rounded-full">
                <img
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" // Example AI Logo
                alt="AI Logo"
                className="w-full h-full object-cover rounded-full"
                />
            </div>
            <div className="border-2 border-gray-200 text-gray-800 p-3 rounded-lg max-w-full flex-grow">
                {message}
            </div>
        </div>
    )
}