import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Dumbbell, ClipboardList, DollarSign, Users, Newspaper } from "lucide-react";
import heroImage from "@assets/generated_images/modern_gym_fitness_hero.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const sections = [
    {
      title: "Client Assessment",
      description: "Complete your personalized fitness assessment in minutes",
      icon: ClipboardList,
      path: "/intake",
      color: "from-purple-500 to-pink-500",
      testId: "card-intake"
    },
    {
      title: "Pricing",
      description: "Explore our coaching packages and find the perfect plan",
      icon: DollarSign,
      path: "/pricing",
      color: "from-blue-500 to-cyan-500",
      testId: "card-pricing"
    },
    {
      title: "About Us",
      description: "Learn about our mission and meet the Cap's FITNESS team",
      icon: Users,
      path: "/about",
      color: "from-green-500 to-emerald-500",
      testId: "card-about"
    },
    {
      title: "Fitness Blog",
      description: "Tips, workouts, and inspiration from our coaches",
      icon: Newspaper,
      path: "/blog",
      color: "from-orange-500 to-red-500",
      testId: "card-blog"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Cap's FITNESS
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
            Transform your body, elevate your mind, achieve your goals
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Card
                    key={section.path}
                    className="cursor-pointer hover-elevate active-elevate-2 transition-all hover:scale-105 overflow-hidden"
                    onClick={() => setLocation(section.path)}
                    data-testid={section.testId}
                  >
                    <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                    <CardHeader className="space-y-3">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{section.title}</CardTitle>
                      <CardDescription className="text-base">
                        {section.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Click to explore →
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-xs text-white/50">
            © 2025 Cap’s Fitness. All rights reserved. 
“The change begins the moment you get back up and keep pushing forward.”

          </p>
        </div>
      </div>
    </div>
  );
}
