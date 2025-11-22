import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Pricing() {
  const [, setLocation] = useLocation();

  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for beginners starting their fitness journey",
      features: [
        "Personalized workout plan",
        "Monthly progress check-ins",
        "Email support",
        "Basic nutrition guidelines",
        "Access to workout library",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$199",
      period: "/month",
      description: "For dedicated athletes seeking serious results",
      features: [
        "Everything in Starter",
        "Weekly 1-on-1 coaching calls",
        "Custom meal planning",
        "24/7 chat support",
        "Advanced progress tracking",
        "Supplement recommendations",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: "$399",
      period: "/month",
      description: "Premium coaching for maximum transformation",
      features: [
        "Everything in Pro",
        "Unlimited coaching access",
        "In-person training sessions",
        "Recovery & mobility programming",
        "Mindset & performance coaching",
        "Priority support",
        "Quarterly fitness assessments",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible coaching packages designed to fit your goals and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-xl scale-105" : ""}`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="space-y-4 pb-8">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  onClick={() => setLocation("/intake")}
                  data-testid={`button-select-${plan.name.toLowerCase()}`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Need a Custom Plan?</CardTitle>
              <CardDescription>
                We offer personalized coaching packages for teams, corporate wellness programs, 
                and athletes with specific needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="lg" onClick={() => setLocation("/intake")}>
                Contact Us for Custom Pricing
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
