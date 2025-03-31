export function AIbubble({ message }: { message: string }) {
    return (
        <div className="flex items-start space-x-4 w-full mt-4">
            {/* AI logo container with fixed size */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMzAgMzAiIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiPjxwYXRoIGQ9Ik0gOSA2IEMgNS42ODYgNiAzIDguNjg2IDMgMTIgTCAzIDI0IEMgMyAyNS4xMDUgMy44OTUgMjYgNSAyNiBMIDkgMjYgTCAxNSAyNiBMIDI1IDI2IEMgMjYuMDkzMDYzIDI2IDI3IDI1LjA5MzA2MyAyNyAyNCBMIDI3IDEyIEMgMjcgOC42OTgzNzQ2IDI0LjMwMTYyNSA2IDIxIDYgTCA5IDYgeiBNIDEzLjQ2Mjg5MSA4IEwgMjEgOCBDIDIzLjIyMDM3NSA4IDI1IDkuNzc5NjI1NCAyNSAxMiBMIDI1IDI0IEwgMTUgMjQgTCAxNSAxMiBDIDE1IDEwLjQ2MDcyMyAxNC40MTU2MTcgOS4wNjIwODUzIDEzLjQ2Mjg5MSA4IHogTSAxOSAxMCBBIDIgMiAwIDAgMCAxNyAxMiBBIDIgMiAwIDAgMCAxOSAxNCBMIDE5IDIxIEwgMjEgMjEgTCAyMyAyMSBMIDIzIDE3IEwgMjEgMTcgTCAyMSAxMiBBIDIgMiAwIDAgMCAxOSAxMCB6IE0gNyAxMiBMIDExIDEyIEMgMTEuNTUyIDEyIDEyIDEyLjQ0OCAxMiAxMyBDIDEyIDEzLjU1MiAxMS41NTIgMTQgMTEgMTQgTCA3IDE0IEMgNi40NDggMTQgNiAxMy41NTIgNiAxMyBDIDYgMTIuNDQ4IDYuNDQ4IDEyIDcgMTIgeiIvPjwvc3ZnPg=="/>
            </div>
            {/* AI message bubble */}
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-full break-words flex-grow">
                <p className="whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
}

