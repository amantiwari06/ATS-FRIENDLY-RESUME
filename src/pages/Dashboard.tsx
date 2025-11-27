import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Sparkles, Target, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useResumes } from "@/hooks/useResumes";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const { user, loading: authLoading, signOut } = useAuth();
  const { resumes, isLoading, createResume } = useResumes();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) return;
    await createResume.mutateAsync(newResumeTitle);
    setIsCreateDialogOpen(false);
    setNewResumeTitle('');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ATS Friendly Resume
          </h1>
          <Button variant="ghost" onClick={signOut}>Sign Out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Create and optimize your resumes with AI</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-[var(--shadow-medium)] transition-shadow cursor-pointer border-2 border-dashed border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle>Create New Resume</CardTitle>
                  <CardDescription>
                    Start from scratch with AI-powered suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="hero" className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Resume</DialogTitle>
                <DialogDescription>
                  Give your resume a title to get started
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Resume Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Software Engineer Resume"
                    value={newResumeTitle}
                    onChange={(e) => setNewResumeTitle(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleCreateResume} 
                  className="w-full"
                  disabled={!newResumeTitle.trim() || createResume.isPending}
                >
                  {createResume.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Resume'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {resumes?.map((resume) => (
            <Card key={resume.id} className="hover:shadow-[var(--shadow-medium)] transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{resume.title}</CardTitle>
                </div>
                <CardDescription>
                  {resume.personal_info?.job_title || 'No job title'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {resume.ats_score && (
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-success" />
                    <span className="text-success font-medium">
                      ATS Score: {resume.ats_score}%
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Last edited {formatDistanceToNow(new Date(resume.updated_at), { addSuffix: true })}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate(`/resume/${resume.id}`)}
                >
                  Edit Resume
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Features</CardTitle>
            </div>
            <CardDescription>
              Enhance your resume with AI-powered tools
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">ATS Checker</h3>
              <p className="text-sm text-muted-foreground">
                Analyze your resume against job descriptions
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Content Optimizer</h3>
              <p className="text-sm text-muted-foreground">
                Get AI suggestions for bullet points and summaries
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
