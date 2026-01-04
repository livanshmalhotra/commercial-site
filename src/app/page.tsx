"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

/* ─────────── Types ─────────── */
interface TimelineItem {
  id: string
  year: string
  title: string
  description: string
  image: string
}

interface TimelineData {
  timeline: TimelineItem[]
}

export default function HomePage() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  /* ─────────── Load Timeline Data ─────────── */
  useEffect(() => {
    const loadTimelineData = async () => {
      try {
        // Fetch timeline data from public folder
        const response = await fetch('/_data/timelinedb.json')
        if (!response.ok) {
          throw new Error('Failed to fetch timeline data')
        }
        const data: TimelineData = await response.json()
        setTimelineData(data.timeline || [])
      } catch (error) {
        console.error('Failed to load timeline data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTimelineData()
  }, [])

  /* ─────────── Intersection Observer ─────────── */
  useEffect(() => {
    if (timelineData.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [timelineData])

  return (
    <main className="!max-w-none !mx-0 !my-0 w-full min-h-screen bg-gray-400 text-foreground">
      {/* ─────────── Top Navigation Bar ─────────── */}
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            AirFryX
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink href="/">Home</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/products">Products</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/recipes">Recipes</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/features">Features</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button>Buy Now</Button>
        </div>
      </header>

      <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-300">
        <div className="relative w-[80vw] max-w-5xl aspect-video rounded-3xl overflow-hidden">
          <Image
            src="/img/black.jpeg"
            alt="Air Fryer"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* ─────────── Hero Section ─────────── */}
      <section className="relative w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center py-1">
          

        

          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
              Smart Air Fryer
            </h1>
          </div>

          <p className="text-2xl md:text-4xl font-bold tracking-tight text-black mt-4">
            Crispy Food. Less Oil. More Health.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        
      </section>

      {/* ─────────── Timeline Section ─────────── */}
      <section className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white text-center mb-16">
            Our Journey
          </h2>

          {isLoading ? (
            <div className="text-center text-white text-xl">Loading timeline...</div>
          ) : timelineData.length === 0 ? (
            <div className="text-center text-white text-xl">No timeline data available</div>
          ) : (
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-white/30" />

              {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.includes(index)

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={`relative flex items-center mb-24 transition-all duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  } ${
                    isLeft
                      ? `justify-end pr-[calc(50%+40px)] ${
                          isVisible ? "translate-x-0" : "-translate-x-32"
                        }`
                      : `justify-start pl-[calc(50%+40px)] ${
                          isVisible ? "translate-x-0" : "translate-x-32"
                        }`
                  }`}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-purple-500 rounded-full z-10" />

                  <div className={`flex gap-6 ${isLeft ? "flex-row-reverse" : ""}`}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md">
                      <span className="text-purple-600 font-bold">{item.year}</span>
                      <h3 className="text-2xl font-bold text-gray-800 mt-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>

                    <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
