export default function Loading() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="animate-pulse">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="h-12 bg-accent rounded-lg w-64 mx-auto mb-4"></div>
                        <div className="h-4 bg-accent rounded w-96 mx-auto"></div>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-center gap-4 mb-12">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-10 bg-accent rounded-full w-24"></div>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-accent rounded-2xl overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300"></div>
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}