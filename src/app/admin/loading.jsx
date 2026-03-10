import { TableSkeleton } from "@/components/Skeleton";

export default function AdminLoading() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded-md w-32" />
                    <div className="h-10 bg-gray-100 rounded-xl w-64" />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="h-12 bg-gray-100 rounded-2xl w-full md:w-64" />
                    <div className="h-12 bg-gray-100 rounded-2xl w-full md:w-48" />
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
                        <div className="h-3 bg-gray-50 rounded w-16" />
                        <div className="h-8 bg-gray-100 rounded-lg w-20" />
                    </div>
                ))}
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8">
                <TableSkeleton rows={8} />
            </div>
        </div>
    );
}
