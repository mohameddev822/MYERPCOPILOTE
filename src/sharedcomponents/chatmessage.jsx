import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import rehypeRaw from 'rehype-raw'; // <-- à ajouter


export default function Chatmessagecontainer({ messages }) {
    
    return (
        <div className="flex flex-col space-y-4 p-4">
            {messages.map((message, index) => (
                <div key={index}>
                    {message.role === "user" && (
                        <div className="flex justify-end">
                            <div className="bg-red-400 rounded-2xl rounded-br-none text-white p-3 max-w-[80%] w-fit break-words">
                                <p className="whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    )}
                    
                    {message.role === "chatbot" && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 rounded-2xl rounded-bl-none text-gray-800 p-3 max-w-[85%] w-fit">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        table: ({ children }) => (
                                            <div className="overflow-x-auto my-3">
                                                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                                                    {children}
                                                </table>
                                            </div>
                                        ),
                                        th: ({ children }) => (
                                            <th className="border border-gray-300 px-3 py-2 bg-gray-200 font-semibold text-left">
                                                {children}
                                            </th>
                                        ),
                                        td: ({ children }) => (
                                            <td className="border border-gray-300 px-3 py-2">
                                                {children}
                                            </td>
                                        ),
                                    
                                        h1: ({ children }) => (
                                            <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>
                                        ),
                                        h2: ({ children }) => (
                                            <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="text-md font-semibold mt-2 mb-1">{children}</h3>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc ml-5 my-2">{children}</ul>
                                        ),
                                        ol: ({ children }) => (
                                            <ol className="list-decimal ml-5 my-2">{children}</ol>
                                        ),
                                        li: ({ children }) => (
                                            <li className="mb-1">{children}</li>
                                        ),
                                        p: ({ children }) => (
                                            <p className="mb-2 whitespace-pre-wrap">{children}</p>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="font-bold text-red-600">{children}</strong>
                                        ),
                                        
                                        hr: () => (
                                            <hr className="my-3 border-gray-300" />
                                        ),
                                        
                                        code: ({ children }) => (
                                            <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                                                {children}
                                            </code>
                                        ),
                                    }}
                                     skipHtml={true}
                                >
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}