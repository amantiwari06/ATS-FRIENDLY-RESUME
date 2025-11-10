import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus, Sparkles, Target } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ResumeAI
          </h1>
          <Button variant="ghost">Sign Out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Create and optimize your resumes with AI</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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

          <Card className="hover:shadow-[var(--shadow-medium)] transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Resume 1</CardTitle>
              </div>
              <CardDescription>Software Engineer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-success" />
                <span className="text-success font-medium">ATS Score: 92%</span>
              </div>
              <p className="text-xs text-muted-foreground">Last edited 2 days ago</p>
              <Button variant="outline" className="w-full mt-4">
                Edit Resume
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-[var(--shadow-medium)] transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Resume 2</CardTitle>
              </div>
              <CardDescription>Product Manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-accent font-medium">ATS Score: 87%</span>
              </div>
              <p className="text-xs text-muted-foreground">Last edited 1 week ago</p>
              <Button variant="outline" className="w-full mt-4">
                Edit Resume
              </Button>
            </CardContent>
          </Card>
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
