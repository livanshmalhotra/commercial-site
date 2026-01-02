import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

interface timeline{
    id: number;
    year:;
    title: string; 
    description: string;
    image:string;  
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* ─────────── Top Navigation Bar ─────────── */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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

      {/* ─────────── Hero Section ─────────── */}
      <section className="relative flex flex-col items-center justify-center">
        
        {/* Air Fryer Image */}
        <div className="relative h-96 w-96 rounded-3xl overflow-hidden">
          <Image
            src="/img/black.jpeg"
            alt="Air Fryer"
            fill
            priority
            className="object-contain"
          />
        </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Smart Air Fryer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crispy food. Less oil. More health.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg">Shop Now</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
      </section>
    {
      id: 1,
      year: '2024',
      title: 'Product Launch',
      description: 'Successfully launched our flagship product to global markets with unprecedented reception.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      year: '2023',
      title: 'Series B Funding',
      description: 'Secured $50M in Series B funding to accelerate growth and expand our team.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      year: '2022',
      title: 'Global Expansion',
      description: 'Opened offices in 5 new countries, bringing our services to millions more users.',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      year: '2021',
      title: 'Innovation Award',
      description: 'Received the prestigious Tech Innovation Award for our groundbreaking platform.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      year: '2020',
      title: 'Company Founded',
      description: 'Started our journey with a vision to transform the industry through technology.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target);
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-16">
          Our Journey
        </h1>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30" />

          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative flex items-center mb-24 transition-all duration-1000 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                } ${
                  isLeft 
                    ? `justify-end pr-[calc(50%+40px)] ${isVisible ? 'translate-x-0' : '-translate-x-32'}`
                    : `justify-start pl-[calc(50%+40px)] ${isVisible ? 'translate-x-0' : 'translate-x-32'}`
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white border-4 border-purple-500 rounded-full z-10 transition-all duration-500 ${
                  isVisible ? 'scale-125 shadow-lg shadow-purple-400' : 'scale-100'
                }`} />

                {/* Content Card */}
                <div className={`flex items-center gap-6 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md group hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="text-purple-600 text-sm font-bold mb-2">{item.year}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Image */}
                  <div className="relative w-64 h-48 rounded-xl overflow-hidden shadow-xl group cursor-pointer">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold text-lg">{item.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
      
    </main>
  )
}
