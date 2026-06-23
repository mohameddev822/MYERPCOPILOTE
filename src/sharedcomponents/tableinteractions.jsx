import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 


export default function Tableinteractions() {
    const [interactions, setInteractionsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [finalSearchTerm, setFinalSearchTerm] = useState('');
    const [filteredInteractions, setFilteredInteractions] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInteractions = async () => {
        try {
            const response = await axios.get('/express/interactions');
            setInteractionsData(response.data);
        } catch (error) {
            console.error('Error fetching interactions:', error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            await fetchInteractions();
        }
        fetchData();
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredInteractions([]);
            setHasSearched(false);
        } else {
            setIsLoading(true);
            setTimeout(() => {
                const lowercasedSearchTerm = searchTerm.toLowerCase();
                const filtered = interactions.filter(interaction => 
                    interaction.user_firstname?.toLowerCase().includes(lowercasedSearchTerm) ||
                    interaction.user_lastname?.toLowerCase().includes(lowercasedSearchTerm) ||
                    `${interaction.user_firstname} ${interaction.user_lastname}`.toLowerCase().includes(lowercasedSearchTerm)
                );
                setFilteredInteractions(filtered);
                setHasSearched(true);
                setIsLoading(false);
                setFinalSearchTerm(searchTerm);
            }, 300);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilteredInteractions([]);
        setHasSearched(false);
    };

    return (
        <div className="w-full mt-10">
            <div className="rounded-lg border border-red-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-black bg-white">
                    <div className="grid grid-cols-3 items-center">
                         <div></div>
                        <h2 className="text-lg font-semibold text-gray-900 ">List of Interactions</h2>
                              
                              
                        
                        <div className="relative flex gap-2 ">
                            <div className="relative ml-15">
                                <input
                                    type="text"
                                    placeholder="Search by first name or last name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={!searchTerm.trim() || isLoading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? 'Searching...' : 'Search'}
                            </button>
                            {hasSearched && (
                                <button
                                    onClick={handleClearSearch}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                          {hasSearched && (
            <div>
                <div></div>
    <p className="px-6 py-2 text-sm text-gray-600 ">
      Found {filteredInteractions.length} result(s) for "{finalSearchTerm}"
    </p>
    </div>
  )}  
                </div>

                <table className="min-w-full border-collapse border border-black">
                    <thead className="bg-white">
                        <tr className="border-b border-black">
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Message
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Response
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black">
                                Timestamp
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {!hasSearched ? (
                            <tr className="border-b border-black">
                                <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 border-r border-black">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <p>Enter a first name or last name to search for interactions</p>
                                    </div>
                                </td>
                            </tr>
                        ) : isLoading ? (
                            <tr className="border-b border-black">
                                <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 border-r border-black">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                                        <p>Searching...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredInteractions.length === 0 ? (
                            <tr className="border-b border-black">
                                <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-500 border-r border-black">
                                    <div className="flex flex-col items-center gap-2">
                                        <svg
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <p>No interactions found for "{finalSearchTerm}"</p>
                                        <p className="text-xs">Try a different name</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            <>
                                {filteredInteractions.map((interaction) => (
                                    <tr key={interaction.id} className="border-b border-black">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-black">
                                            {interaction.user_firstname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-black">
                                            {interaction.user_lastname}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-black">
                                            {interaction.message}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 border-r border-black">
                                             <ReactMarkdown
                                                                                remarkPlugins={[remarkGfm]}
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
                                                                            >
                                                                                {interaction.response}
                                                                            </ReactMarkdown>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-black font-bold">
                                            {interaction.timestamp} GMT
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}