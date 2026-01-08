import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-4 gap-6">
        {"abcdefgh".split("").map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
