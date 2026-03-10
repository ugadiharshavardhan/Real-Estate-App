"use client";

export function Skeleton({ className = "", variant = "rect" }) {
    const baseClasses = "skeleton";
    const variantClasses = {
        rect: "rounded-lg",
        circle: "rounded-full",
        text: "rounded-md h-4 w-full mb-2",
    };

    return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
}

export function ProjectCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full animate-pulse">
            <div className="h-64 bg-gray-200" />
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 rounded-md w-full" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6" />
                <div className="flex justify-between items-center pt-4">
                    <div className="h-5 bg-gray-200 rounded-md w-24" />
                    <div className="h-10 bg-gray-200 rounded-full w-32" />
                </div>
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }) {
    return (
        <div className="space-y-4 animate-pulse">
            {[...Array(rows)].map((_, i) => (
                <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="h-5 bg-gray-200 rounded w-12" />
                    <div className="h-5 bg-gray-200 rounded flex-1" />
                    <div className="h-5 bg-gray-200 rounded w-24" />
                    <div className="h-5 bg-gray-200 rounded w-20" />
                </div>
            ))}
        </div>
    );
}
