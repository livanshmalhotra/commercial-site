import SkeletonCard from "@/components/ui/SkeletonCard";

export default function leading(){
    return(
        <div className="grid grid-cols-4 gap-2">
            {
                "abcdefghi".split('').map(
                    i=>(
                        <SkeletonCard key={i}/>
                    )
                )
            }
        </div>
    )
}

