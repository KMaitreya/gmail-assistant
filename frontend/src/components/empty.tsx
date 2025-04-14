export function Empty(){
    return (
        <div className="w-full flex justify-center items-center bg-white">
            <div className="w-2/3 h-screen flex flex-col items-center justify-center">
                {/* <img
                    src="/icons8-mailbox.gif" // Example AI Logo
                    alt="AI Logo"
                    className="w-25 h-25 object-cover"
                /> */}
                <h1 className="text-gray-700 text-4xl mt-4">No messages yet</h1>
                <p className="text-gray-500 text-xl">Start a conversation to see responses here.</p>
            </div>
        </div>
    )
}