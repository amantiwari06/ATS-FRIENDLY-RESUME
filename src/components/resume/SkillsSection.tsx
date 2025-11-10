import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SkillsSectionProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

const SkillsSection = ({ data, onUpdate }: SkillsSectionProps) => {
  const [skills, setSkills] = useState<string[]>(data);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-skill">Add Skill</Label>
        <div className="flex gap-2">
          <Input
            id="new-skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., JavaScript, Project Management"
          />
          <Button onClick={addSkill} type="button">
            Add
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[100px]">
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet</p>
        ) : (
          skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))
        )}
      </div>

      <Button onClick={() => onUpdate(skills)} className="w-full">
        Save Skills
      </Button>
    </div>
  );
};

export default SkillsSection;
