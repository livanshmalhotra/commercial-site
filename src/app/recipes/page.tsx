import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Recipe {
  id: number
  title: string
  image: string
  time: string
  description: string
  vegan: boolean
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:5000/recipes", {
    cache: "no-store",
  })
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return result.json()
}

export default async function RecipesPage() {
  const recipes = await getRecipes()
  
  return (
    <main className="!max-w-none !mx-0 !my-0 w-full min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Delicious Recipes
          </h1>
          <p className="text-zinc-400 text-lg">
            Crispy, healthy meals made with Air-FryX
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm overflow-hidden group hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden border-2 border-orange-500/30 flex-shrink-0">
                    <Image
                      src={`/img/${recipe.image}`}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white group-hover:text-orange-400 transition-colors">
                      {recipe.title}
                    </CardTitle>
                    <CardDescription className="text-orange-400/80 font-medium mt-1">
                      ⏱ {recipe.time}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  {recipe.description}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-500/25">
                  View Recipe
                </Button>

                {recipe.vegan && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30">
                    🌱 Vegan
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
