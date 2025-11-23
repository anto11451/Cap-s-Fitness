import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { FormData } from "../IntakeForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Step5Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step5Nutrition({ formData, updateFormData }: Step5Props) {
  const [loveInput, setLoveInput] = useState("");
  const [avoidInput, setAvoidInput] = useState("");

  // Suggested foods
  const suggestedFoods = [
    "Chicken", "Eggs", "Rice", "Oats", "Broccoli",
    "Roti", "Paneer", "Fish", "Dal", "Veggies"
  ];

  const addFoodLove = (food?: string) => {
    const value = food ?? loveInput.trim();
    if (value && !formData.foodsLove.includes(value)) {
      updateFormData({ foodsLove: [...formData.foodsLove, value] });
      setLoveInput("");
    }
  };

  const removeFoodLove = (item: string) => {
    updateFormData({ foodsLove: formData.foodsLove.filter((f) => f !== item) });
  };

  const addFoodAvoid = (food?: string) => {
    const value = food ?? avoidInput.trim();
    if (value && !formData.foodsAvoid.includes(value)) {
      updateFormData({ foodsAvoid: [...formData.foodsAvoid, value] });
      setAvoidInput("");
    }
  };

  const removeFoodAvoid = (item: string) => {
    updateFormData({ foodsAvoid: formData.foodsAvoid.filter((f) => f !== item) });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="eatingPattern">
          Eating Pattern <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.eatingPattern}
          onValueChange={(value) => updateFormData({ eatingPattern: value })}
        >
          <SelectTrigger id="eatingPattern" data-testid="select-eating-pattern">
            <SelectValue placeholder="Select your preferred eating pattern" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3-meals">3 meals/day</SelectItem>
            <SelectItem value="4-meals">4 meals/day</SelectItem>
            <SelectItem value="5-meals">5 small meals/day</SelectItem>
            <SelectItem value="flexible">Flexible eating</SelectItem>
            <SelectItem value="intermittent-fasting">Intermittent Fasting</SelectItem>
            <SelectItem value="omad">One Meal a Day (OMAD)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ------------------ FOODS YOU LOVE ------------------ */}
      <div className="space-y-3 p-6 rounded-lg bg-muted/30">
        <Label>Foods You Love</Label>
        <p className="text-sm text-muted-foreground">
          Tap a suggestion or add your own.
        </p>

        {/* Suggested Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedFoods.map((food) => (
            <button
              key={food}
              type="button"
              onClick={() => addFoodLove(food)}
              className="px-3 py-1 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 text-xs font-medium transition"
            >
              {food}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="e.g., Chicken, Rice, Broccoli"
            value={loveInput}
            onChange={(e) => setLoveInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFoodLove())}
            data-testid="input-foods-love"
          />
          <Button type="button" size="icon" onClick={() => addFoodLove()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.foodsLove.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.foodsLove.map((food, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="cursor-pointer px-2 py-1"
                onClick={() => removeFoodLove(food)}
              >
                {food}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* ------------------ FOODS YOU AVOID ------------------ */}
      <div className="space-y-3 p-6 rounded-lg bg-muted/30">
        <Label>Foods You Avoid</Label>
        <p className="text-sm text-muted-foreground">
          Tap a suggestion or add your own.
        </p>

        {/* Suggested Chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestedFoods.map((food) => (
            <button
              key={food}
              type="button"
              onClick={() => addFoodAvoid(food)}
              className="px-3 py-1 rounded-full bg-red-200 text-red-800 hover:bg-red-300 text-xs font-medium transition"
            >
              {food}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="e.g., Dairy, Nuts, Gluten"
            value={avoidInput}
            onChange={(e) => setAvoidInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFoodAvoid())}
            data-testid="input-foods-avoid"
          />
          <Button type="button" size="icon" onClick={() => addFoodAvoid()}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {formData.foodsAvoid.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.foodsAvoid.map((food, idx) => (
              <Badge
                key={idx}
                variant="destructive"
                className="cursor-pointer px-2 py-1"
                onClick={() => removeFoodAvoid(food)}
              >
                {food}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* ------------------ ADDITIONAL NOTES ------------------ */}
      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any other preferences, dietary restrictions, or information you'd like us to know..."
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
}
