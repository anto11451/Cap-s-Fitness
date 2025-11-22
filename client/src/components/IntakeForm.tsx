import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import Step1Personal from "./intake-steps/Step1Personal";
import Step2Body from "./intake-steps/Step2Body";
import Step3Health from "./intake-steps/Step3Health";
import Step4Goals from "./intake-steps/Step4Goals";
import Step5Nutrition from "./intake-steps/Step5Nutrition";
import ReviewStep from "./intake-steps/ReviewStep";
import SuccessStep from "./intake-steps/SuccessStep";

export interface FormData {
  name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  height: string;
  weight: string;
  sleepHours: string;
  sittingHours: string;
  stressLevel: number;
  activityLevel: string;
  medicalConditions: string;
  onMedications: boolean;
  medicationDetails: string;
  pastSurgeries: boolean;
  surgeryDetails: string;
  consultedDoctor: boolean;
  primaryGoal: string;
  shortTermGoal: string;
  longTermGoal: string;
  motivation: string;
  trainingStyle: string;
  daysPerWeek: string;
  equipment: string[];
  eatingPattern: string;
  foodsLove: string[];
  foodsAvoid: string[];
  additionalNotes: string;
}

const TOTAL_STEPS = 5;

export default function IntakeForm() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    sleepHours: "",
    sittingHours: "",
    stressLevel: 5,
    activityLevel: "",
    medicalConditions: "",
    onMedications: false,
    medicationDetails: "",
    pastSurgeries: false,
    surgeryDetails: "",
    consultedDoctor: false,
    primaryGoal: "",
    shortTermGoal: "",
    longTermGoal: "",
    motivation: "",
    trainingStyle: "",
    daysPerWeek: "",
    equipment: [],
    eatingPattern: "",
    foodsLove: [],
    foodsAvoid: [],
    additionalNotes: "",
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === TOTAL_STEPS) {
      setCurrentStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep <= 6) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (currentStep === 1) {
      setLocation("/");
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting form data:", formData);
    setIsSubmitted(true);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return <SuccessStep />;
  }

  const progressValue = currentStep === 6 ? 100 : (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8 px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              BOLD FITNESS
            </h1>
            <span className="text-sm text-muted-foreground">
              {currentStep === 6 ? "Review" : `Step ${currentStep} of ${TOTAL_STEPS}`}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" data-testid="progress-intake" />
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl md:text-2xl">
              {currentStep === 1 && "Personal Details"}
              {currentStep === 2 && "Body & Lifestyle"}
              {currentStep === 3 && "Health Information"}
              {currentStep === 4 && "Goals & Training"}
              {currentStep === 5 && "Nutrition Preferences"}
              {currentStep === 6 && "Review Your Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <Step1Personal formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 2 && (
              <Step2Body formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 3 && (
              <Step3Health formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 4 && (
              <Step4Goals formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 5 && (
              <Step5Nutrition formData={formData} updateFormData={updateFormData} />
            )}
            {currentStep === 6 && (
              <ReviewStep formData={formData} onEdit={handleEdit} />
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full sm:w-auto"
                data-testid="button-back"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep < 6 ? (
                <Button
                  onClick={handleNext}
                  className="w-full sm:flex-1"
                  data-testid="button-next"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:flex-1"
                  data-testid="button-submit"
                >
                  Submit Intake
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
