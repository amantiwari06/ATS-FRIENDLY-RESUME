import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Sparkles, Target, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import PersonalInfoSection from "@/components/resume/PersonalInfoSection";
import ExperienceSection from "@/components/resume/ExperienceSection";
import EducationSection from "@/components/resume/EducationSection";
import SkillsSection from "@/components/resume/SkillsSection";
import ResumePreview from "@/components/resume/ResumePreview";
import ATSAnalysis from "@/components/resume/ATSAnalysis";

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { updateResume } = useResumes();
  const [activeTab, setActiveTab] = useState("personal");

  const { data: resume, isLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleUpdate = async (field: string, value: any) => {
    if (!id) return;
    await updateResume.mutateAsync({
      id,
      updates: { [field]: value },
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Resume not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{resume.title}</h1>
                <p className="text-sm text-muted-foreground">Resume Builder</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setActiveTab("analysis")}>
                <Target className="mr-2 h-4 w-4" />
                ATS Check
              </Button>
              <Button variant="hero">
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="analysis">
                    <Sparkles className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                  <PersonalInfoSection
                    data={resume.personal_info || {}}
                    onUpdate={(data) => handleUpdate('personal_info', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-6">
                  <ExperienceSection
                    data={Array.isArray(resume.experience) ? resume.experience : []}
                    onUpdate={(data) => handleUpdate('experience', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-6">
                  <EducationSection
                    data={Array.isArray(resume.education) ? resume.education : []}
                    onUpdate={(data) => handleUpdate('education', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <SkillsSection
                    data={(Array.isArray(resume.skills) ? resume.skills : []) as string[]}
                    onUpdate={(data) => handleUpdate('skills', data)}
                  />
                </TabsContent>

                <TabsContent value="analysis" className="mt-6">
                  <ATSAnalysis resumeId={id!} resumeData={resume} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="sticky top-24 h-fit">
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
