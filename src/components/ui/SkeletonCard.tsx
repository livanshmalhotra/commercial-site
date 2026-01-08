"use client"

export default function SkeletonCard() {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar Skeleton */}
          <div className="h-16 w-16 rounded-xl bg-linear-to-br from-zinc-700 to-zinc-800 animate-pulse" />
          
          <div className="flex-1 space-y-2">
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 bg-zinc-700 rounded-lg animate-pulse" />
            {/* Time Skeleton */}
            <div className="h-4 w-1/3 bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4 space-y-2">
        <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-zinc-800 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-zinc-800 rounded animate-pulse" />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
        {/* Button Skeleton */}
        <div className="h-10 w-28 bg-linear-to-r from-orange-500/20 to-amber-500/20 rounded-md animate-pulse" />
        {/* Badge Skeleton */}
        <div className="h-6 w-16 bg-zinc-800 rounded-full animate-pulse" />
      </div>
    </div>
  )
}
