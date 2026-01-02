import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Avatar,AvatarFallback,AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { response } from "express";
import { resolve } from "path";

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  description: string;
  vegan: boolean;
}

async function getRecipes(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:5000/recipes");

  await new Promise((resolve)=>setTimeout(resolve,3000))
  
  return result.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <main>
      <div className="grid grid-cols-4 gap-2">
        {recipes.map(recipe =>(
          <Card key={recipe.id} > 
            <CardHeader>
              <Avatar>
                <AvatarImage src={`/img/${recipe.image}`} alt="recipe img" width={220} height={140}  className="recipe-image"/>
                <AvatarFallback>
                  {recipe.title.slice(0,2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="recipe-title">{recipe.title}</CardTitle>
                <CardDescription className="class-time">{recipe.time}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="grey">View Recipe</Button>
              <br/>
              {recipe.vegan && 
                <Button variant="vegan">Vegan!</Button>
            }
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
