export default function Tableofusers({ viewers }) {
    return (
        <div className="w-full mt-10">
            <div className="rounded-lg border border-red-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-black bg-white">
                    <h2 className="text-lg font-semibold text-gray-900">List of Users</h2>
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {viewers.length === 0 ? (
                            <tr className="border-b border-black">
                                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 border-r border-black">
                                    No viewers found
                                </td>
                            </tr>
                        ) : (
                            viewers.map((viewer) => (
                                <tr key={viewer.id} className="hover:bg-red-300 border-b border-black">
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium text-gray-900 border-r border-black">
                                        {viewer.firstName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 border-r border-black">
                                        {viewer.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
                                        {viewer.email}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}