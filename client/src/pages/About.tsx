import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Heart, Zap, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, setLocation] = useLocation();

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on measurable outcomes and sustainable progress",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Every client gets a custom plan tailored to their unique needs",
    },
    {
      icon: Zap,
      title: "Science-Based",
      description: "Our methods are backed by the latest research and proven techniques",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in coaching and client service",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              About BOLD FITNESS
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering individuals to achieve their peak physical potential through 
              personalized coaching and evidence-based training
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg leading-relaxed">
              <p>
                At BOLD FITNESS, we believe that everyone deserves access to world-class fitness coaching 
                that's tailored to their individual needs, goals, and lifestyle.
              </p>
              <p>
                Founded by a team of certified personal trainers, nutritionists, and performance coaches, 
                we've helped hundreds of clients transform their bodies and lives through our science-based, 
                personalized approach to fitness.
              </p>
              <p>
                Whether you're just starting your fitness journey or looking to break through a plateau, 
                we're here to guide, support, and motivate you every step of the way.
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="hover-elevate" data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, "-")}`}>
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="text-3xl">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Certified Experts</h3>
                  <p className="text-muted-foreground">
                    All our coaches hold nationally recognized certifications and continue 
                    their education to stay current with industry best practices.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Proven Track Record</h3>
                  <p className="text-muted-foreground">
                    With over 500+ successful client transformations, we have the experience 
                    and expertise to help you reach your goals.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Flexible Programming</h3>
                  <p className="text-muted-foreground">
                    Whether you train at home, outdoors, or in a gym, we create programs 
                    that fit your lifestyle and equipment availability.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Continuous Support</h3>
                  <p className="text-muted-foreground">
                    We're with you beyond the workout - providing nutrition guidance, 
                    accountability, and motivation throughout your journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-6 py-8">
            <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-lg text-muted-foreground">
              Take the first step towards your fitness goals today
            </p>
            <Button
              size="lg"
              onClick={() => setLocation("/intake")}
              data-testid="button-start-intake"
            >
              Complete Your Intake
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
