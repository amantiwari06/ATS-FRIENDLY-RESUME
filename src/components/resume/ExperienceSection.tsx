import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ExperienceSectionProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

const ExperienceSection = ({ data, onUpdate }: ExperienceSectionProps) => {
  const [experiences, setExperiences] = useState(data);
  const [loading, setLoading] = useState(false);

  const addExperience = () => {
    setExperiences([...experiences, {
      company: '',
      position: '',
      location: '',
      start_date: '',
      end_date: '',
      current: false,
      description: '',
    }]);
  };

  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    onUpdate(newExperiences);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [field]: value };
    setExperiences(newExperiences);
  };

  const getSuggestions = async (index: number) => {
    const exp = experiences[index];
    if (!exp.position || !exp.company) {
      toast.error('Please fill in position and company first');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('suggest-content', {
        body: {
          type: 'bullet',
          context: `${exp.position} at ${exp.company}. Current description: ${exp.description || 'none'}`,
          jobTitle: exp.position,
        },
      });

      if (error) throw error;
      
      const newExperiences = [...experiences];
      newExperiences[index].description = data.suggestions;
      setExperiences(newExperiences);
      toast.success('AI suggestions generated!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.map((exp, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => removeExperience(index)}
                size="sm"
                variant="ghost"
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>

              <div>
                <Label>Position *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                  placeholder="Job Title"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.start_date}
                  onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.end_date}
                  onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                  disabled={exp.current}
                />
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                  className="mr-2"
                />
                <Label htmlFor={`current-${index}`}>Currently working here</Label>
              </div>

              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <Label>Description</Label>
                  <Button
                    onClick={() => getSuggestions(index)}
                    size="sm"
                    variant="ghost"
                    disabled={loading}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Suggest
                  </Button>
                </div>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={() => onUpdate(experiences)} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
};

export default ExperienceSection;
