export default function Loading() {
    return (
        <div className="min-h-screen bg-white p-8 md:p-12 space-y-12 animate-pulse overflow-hidden">
            {/* Top Header Mockup */}
            <div className="flex justify-between items-center mb-16 opacity-40">
                <div className="h-10 w-40 bg-gray-100 rounded-2xl" />
                <div className="hidden md:flex gap-6">
                    <div className="h-4 w-20 bg-gray-50 rounded-lg" />
                    <div className="h-4 w-20 bg-gray-50 rounded-lg" />
                    <div className="h-4 w-20 bg-gray-50 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-gray-100 rounded-2xl" />
            </div>

            {/* Hero Mockup */}
            <div className="w-full h-[300px] md:h-[500px] bg-gray-50 rounded-[40px] relative overflow-hidden opacity-40">
                <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, #f9fafb 0%, #f3f4f6 50%, #f9fafb 100%)', backgroundSize: '1000px 100%' }} />
            </div>

            {/* Content Grid Mockup */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="h-64 bg-gray-50 rounded-3xl" />
                        <div className="h-6 bg-gray-100 rounded-xl w-3/4" />
                        <div className="h-4 bg-gray-50 rounded-lg w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
