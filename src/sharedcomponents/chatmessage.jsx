export default function Chatmessagecontainer({ messages }) {
   
    
    return (
        <div className="flex flex-col space-y-4 p-4">
            {messages.map((message, index) => (
                <div key={index}>
                    {message.role === "user" && (
                        <div className="flex justify-end">
                            <div className="bg-blue-900 rounded-2xl text-white p-3 max-w-[80%] w-fit break-words whitespace-pre-line">
                                <p>{message.content}</p>
                            </div>
                        </div>
                    )}
                    {message.role === "chatbot" && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 rounded-2xl text-black p-3 max-w-[80%] w-fit break-words whitespace-pre-line">
                                <p>{message.content}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}