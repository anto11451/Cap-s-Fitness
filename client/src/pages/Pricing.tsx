import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Pricing() {
  const [, setLocation] = useLocation();

  const plans = [
    {
      name: "Weekly Starter Plan",
      price: "₹199",
      period: "/week",
      description: "Perfect for beginners who want light guidance and a basic structured plan",
      features: [
        "Basic personalised diet",
        "Basic workout plan",
        "Weekly check-in",
        "Light guidance",
        "No mid-week adjustments"
      ],
      popular: false,
    },
    {
      name: "4-Week Coaching Plan",
      price: "₹699",
      period: "/4 weeks",
      description: "Full coaching experience with adjustments, support & complete personalization",
      features: [
        "Fully personalised diet plan",
        "Custom workout plan (home/gym)",
        "Weekly check-ins",
        "Weekly adjustments",
        "WhatsApp support (reasonable hours)",
        "Lifestyle habit guidance"
      ],
      popular: true,
    },
    {
      name: "8-Week Transformation Plan",
      price: "₹1499",
      period: "/8 weeks",
      description: "Complete transformation program with priority support and weekly upgrades",
      features: [
        "Everything in 4-week plan",
        "Weekly personalised updates",
        "Habit & lifestyle coaching",
        "Priority support",
        "Form review (video-based)",
        "Progress tracking",
        "End-of-program review",
        "Maintenance strategy"
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Coaching Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing. No hidden charges. Choose the plan that fits your goal.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-xl scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="space-y-4 pb-8">
                <CardTitle className="text-2xl text-center">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="text-base text-center">{plan.description}</CardDescription>
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
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Plan */}
        <div className="mt-16 text-center">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Need a Custom Plan?</CardTitle>
              <CardDescription>
                We offer personalised coaching for corporate teams, athletes, or special goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="lg" onClick={() => setLocation("/intake")}>
                Contact for Custom Pricing
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
