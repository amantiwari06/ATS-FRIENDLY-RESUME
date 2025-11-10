import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface EducationSectionProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

const EducationSection = ({ data, onUpdate }: EducationSectionProps) => {
  const [education, setEducation] = useState(data);

  const addEducation = () => {
    setEducation([...education, {
      school: '',
      degree: '',
      field: '',
      location: '',
      start_date: '',
      end_date: '',
      gpa: '',
    }]);
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
    onUpdate(newEducation);
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => removeEducation(index)}
                size="sm"
                variant="ghost"
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>School/University *</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(index, 'school', e.target.value)}
                  placeholder="University Name"
                />
              </div>

              <div>
                <Label>Degree *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>

              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateEducation(index, 'field', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>

              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.start_date}
                  onChange={(e) => updateEducation(index, 'start_date', e.target.value)}
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.end_date}
                  onChange={(e) => updateEducation(index, 'end_date', e.target.value)}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button onClick={() => onUpdate(education)} className="w-full">
        Save All Changes
      </Button>
    </div>
  );
};

export default EducationSection;
