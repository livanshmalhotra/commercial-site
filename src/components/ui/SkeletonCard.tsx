import { Card, CardContent,CardHeader,CardFooter } from "./card"
import { Skeleton } from "./skeleton"

export default function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-between">
        <CardHeader className="flex-row items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full"/>
            <Skeleton className="h-6 grow" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-4 grow mt-4"/>
            <Skeleton className="h-4 grow mt-4"/>
            <Skeleton className="h-4 w-1/2 mt-4"/>
        </CardContent>
        <CardFooter >
            <Skeleton className="h-10 w-8"/>
        </CardFooter>
    </Card>
  )
}
