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

  const addFoodLove = () => {
    if (loveInput.trim() && !formData.foodsLove.includes(loveInput.trim())) {
      updateFormData({ foodsLove: [...formData.foodsLove, loveInput.trim()] });
      setLoveInput("");
    }
  };

  const removeFoodLove = (item: string) => {
    updateFormData({ foodsLove: formData.foodsLove.filter((f) => f !== item) });
  };

  const addFoodAvoid = () => {
    if (avoidInput.trim() && !formData.foodsAvoid.includes(avoidInput.trim())) {
      updateFormData({ foodsAvoid: [...formData.foodsAvoid, avoidInput.trim()] });
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
        <Select value={formData.eatingPattern} onValueChange={(value) => updateFormData({ eatingPattern: value })}>
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

      <div className="space-y-3 p-6 rounded-lg bg-muted/30">
        <Label>
          Foods You Love
        </Label>
        <p className="text-sm text-muted-foreground">
          Add foods you enjoy eating (we'll include them in your plan)
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Chicken, Rice, Broccoli"
            value={loveInput}
            onChange={(e) => setLoveInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFoodLove())}
            data-testid="input-foods-love"
          />
          <Button
            type="button"
            size="icon"
            onClick={addFoodLove}
            data-testid="button-add-food-love"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {formData.foodsLove.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.foodsLove.map((food, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => removeFoodLove(food)}
                data-testid={`badge-food-love-${idx}`}
              >
                {food}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3 p-6 rounded-lg bg-muted/30">
        <Label>
          Foods You Avoid
        </Label>
        <p className="text-sm text-muted-foreground">
          Add foods you want to avoid (allergies, preferences, restrictions)
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Dairy, Nuts, Gluten"
            value={avoidInput}
            onChange={(e) => setAvoidInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFoodAvoid())}
            data-testid="input-foods-avoid"
          />
          <Button
            type="button"
            size="icon"
            onClick={addFoodAvoid}
            data-testid="button-add-food-avoid"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {formData.foodsAvoid.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.foodsAvoid.map((food, idx) => (
              <Badge
                key={idx}
                variant="destructive"
                className="cursor-pointer"
                onClick={() => removeFoodAvoid(food)}
                data-testid={`badge-food-avoid-${idx}`}
              >
                {food}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">
          Additional Notes
        </Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any other preferences, dietary restrictions, or information you'd like us to know..."
          value={formData.additionalNotes}
          onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
          rows={4}
          data-testid="textarea-additional-notes"
        />
      </div>
    </div>
  );
}
