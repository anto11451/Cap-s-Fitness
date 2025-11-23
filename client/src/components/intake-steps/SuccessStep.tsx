import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function SuccessStep() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle2 className="w-24 h-24 text-primary" data-testid="icon-success" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Bravo you nailed it!!!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            We'll contact you soon
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-8 space-y-4 max-w-lg mx-auto">
          <p className="text-base text-foreground">
            Thank you for completing! change begins here <strong>Cap's FITNESS</strong>.
          </p>
          <p className="text-sm text-muted-foreground">
            Cap is reviewing your information and will reach out within 24-48 hours 
            with your personalized fitness plan tailored to your goals and preferences.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-home"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-8">
          Your fitness transformation starts now. Stay motivated!
        </p>
      </div>
    </div>
  );
}
