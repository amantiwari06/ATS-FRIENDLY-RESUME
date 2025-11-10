import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, Sparkles, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ResumeAI
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  AI-Powered Resume Builder
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Land Your Dream Job with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ATS-Optimized
                </span>{" "}
                Resumes
              </h1>
              <p className="text-lg text-muted-foreground">
                Create professional resumes that get past Applicant Tracking Systems and into the hands of recruiters. Powered by AI for real-time optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Building Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  See Examples
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Free templates</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full" />
              <img
                src={heroImage}
                alt="Resume builder interface"
                className="relative rounded-2xl shadow-[var(--shadow-large)] border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground">
                  Get intelligent recommendations for bullet points, summaries, and keywords tailored to your target role.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ATS Compatibility Checker</h3>
                <p className="text-muted-foreground">
                  Analyze your resume against ATS requirements and get a detailed score with actionable feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
                <p className="text-muted-foreground">
                  Choose from multiple ATS-friendly templates designed by hiring experts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Job Description Parser</h3>
                <p className="text-muted-foreground">
                  Upload job descriptions to extract key skills and requirements automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
                <p className="text-muted-foreground">
                  See your changes instantly with live preview as you build your resume.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 hover:shadow-[var(--shadow-medium)] transition-all">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export to PDF</h3>
                <p className="text-muted-foreground">
                  Download your polished resume as a professional PDF ready to send to employers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of job seekers who've landed their dream jobs with ATS-optimized resumes
          </p>
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="font-semibold">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ResumeAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
