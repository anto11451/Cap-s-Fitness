import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Dumbbell, Zap, Heart } from "lucide-react";
import heroImage from "@assets/generated_images/purple-pink_gradient_fitness_hero.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Dumbbell className="w-12 h-12 text-primary-foreground" />
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              BOLD FITNESS
            </h1>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-white/95">
              Intake
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              Fast onboarding — feels like an app.
            </p>
            <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto font-light">
              Complete your personalized fitness assessment in just a few minutes. 
              We'll create a custom plan tailored to your goals, lifestyle, and preferences.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 py-8">
            <div className="flex items-center gap-3 text-white/80">
              <Zap className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">5 Quick Steps</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Personalized Plan</span>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              size="lg"
              className="rounded-full px-12 py-6 text-lg font-semibold shadow-2xl hover:scale-105 transition-transform"
              onClick={() => setLocation("/intake")}
              data-testid="button-start-intake"
            >
              Start Now
            </Button>
          </div>

          <p className="text-xs text-white/50 pt-8">
            Your journey to peak fitness starts here
          </p>
        </div>
      </div>
    </div>
  );
}
