"use client"
import { Menu, X, Flame, Timer, Zap, Shield, Star, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"


/* ─────────── Types ─────────── */
interface TimelineItem {
  id: string
  year: string
  title: string
  description: string
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface FoodItem {
  name: string
  time: string
  image: string
}

/* ─────────── Data ─────────── */
const timelineData: TimelineItem[] = [
  {
    id: "1",
    year: "2019",
    title: "The Beginning",
    description: "Air-FryX was founded with a mission to revolutionize healthy cooking."
  },
  {
    id: "2",
    year: "2020",
    title: "First Product Launch",
    description: "Released our flagship smart air fryer with touch controls."
  },
  {
    id: "3",
    year: "2021",
    title: "AI Integration",
    description: "Introduced AI-powered cooking presets and app connectivity."
  },
  {
    id: "4",
    year: "2022",
    title: "Global Expansion",
    description: "Expanded to 50+ countries with localized recipe databases."
  },
  {
    id: "5",
    year: "2023",
    title: "Award Winning",
    description: "Named #1 Smart Kitchen Appliance by Tech Home Magazine."
  }
]

const features: Feature[] = [
  {
    icon: <Flame className="w-8 h-8" />,
    title: "360° Rapid Air",
    description: "Crispy results with up to 90% less oil than traditional frying"
  },
  {
    icon: <Timer className="w-8 h-8" />,
    title: "Smart Timer",
    description: "Precise cooking with auto shut-off and keep warm function"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Quick Preheat",
    description: "Ready to cook in just 3 minutes with turbo heat technology"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Safe & Clean",
    description: "Cool-touch exterior and dishwasher-safe removable parts"
  }
]

const foodItems: FoodItem[] = [
  { name: "Crispy Fries", time: "15 min", image: "/images/food-fries.png" },
  { name: "Juicy Chicken", time: "25 min", image: "/images/food-chicken.png" },
  { name: "Roasted Veggies", time: "12 min", image: "/images/food-veggies.png" }
]

/* ─────────── Button Component ─────────── */
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "hero" | "heroOutline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
    hero: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105",
    heroOutline: "border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50",
    ghost: "text-gray-300 hover:text-white hover:bg-white/10"
  }
  
  const sizes = {
    default: "h-11 px-6 py-2 text-sm",
    sm: "h-9 px-4 text-xs",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10"
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* ─────────── Main Page Component ─────────── */
export default function HomePage() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Recipes", href: "/recipes" },
    { label: "Features", href: "/features" },
    { label: "Contact", href: "/contact" },
  ]

  /* ─────────── Intersection Observer ─────────── */
  useEffect(() => {
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
  }, [])

  return (
    <main className="max-w-none! mx-0! my-0! w-full min-h-screen bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* ─────────── Navigation ─────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold bg-linear-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Air-FryX
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ label, href }) => (
              <Link
              key={label}
              href={href}
              className="text-gray-300 hover:text-orange-400 transition-colors duration-300 text-sm font-medium"
              >
                {label}
                </Link>
              ))}
              </nav>

          <div className="hidden md:block">
            <Button variant="hero">Buy Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-white/5 px-6 py-4">
            <nav className="flex flex-col gap-4">
              {navItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-300 hover:text-orange-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Button variant="hero" className="mt-4">Buy Now</Button>
            </nav>
          </div>
        )}
      </header>

      {/* ─────────── Hero Section ─────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-orange-300">#1 Rated Smart Air Fryer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Smart Air Fryer
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
              Crispy food with 90% less oil. Smart cooking technology that makes healthy eating effortless.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg">
                Shop Now
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "90%", label: "Less Oil" },
                { value: "50+", label: "Recipes" },
                { value: "4.9★", label: "Rating" }
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Image */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              {/* Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-full blur-3xl animate-pulse" />
              
              {/* Product Image Placeholder */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent" />
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center">
                    <Flame className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-gray-400 text-sm">Air-FryX Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Features Section ─────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Why Choose Air-FryX?
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Advanced technology meets beautiful design for the perfect cooking experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Recipe Showcase ─────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Cook Anything
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              From crispy fries to juicy chicken, perfect results every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {foodItems.map((food, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/5 hover:border-orange-500/30 transition-all duration-500"
              >
                <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500/30 to-amber-600/30 rounded-full flex items-center justify-center">
                    <Flame className="w-12 h-12 text-orange-400" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{food.name}</h3>
                  <div className="flex items-center gap-2 text-orange-400">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm">{food.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Timeline Section ─────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500 opacity-30" />

            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleItems.includes(index)

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={`relative flex items-center mb-16 transition-all duration-1000 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  } ${
                    isLeft
                      ? `justify-end pr-[calc(50%+32px)] ${isVisible ? "translate-x-0" : "-translate-x-16"}`
                      : `justify-start pl-[calc(50%+32px)] ${isVisible ? "translate-x-0" : "translate-x-16"}`
                  }`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10 shadow-lg shadow-orange-500/50" />

                  {/* Card */}
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-md hover:border-orange-500/30 transition-all duration-300">
                    <span className="text-orange-400 font-bold text-lg">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-gray-400 mt-2">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────── CTA Section ─────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Ready to Cook Smarter?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have transformed their cooking with Air-FryX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Shop Now
                <ChevronRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg">
                View All Products
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-400" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              Air-FryX
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              {["Privacy", "Terms", "Support", "Contact"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-orange-400 transition-colors">
                  {item}
                </Link>
              ))}
            </nav>
            <p className="text-gray-500 text-sm">© 2024 Air-FryX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
