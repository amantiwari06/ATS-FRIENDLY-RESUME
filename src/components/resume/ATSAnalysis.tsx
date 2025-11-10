import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ATSAnalysisProps {
  resumeId: string;
  resumeData: any;
}

const ATSAnalysis = ({ resumeId, resumeData }: ATSAnalysisProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: {
          resumeData,
          jobDescription,
        },
      });

      if (error) throw error;

      setAnalysis(data);
      
      // Update resume with new score
      await supabase
        .from('resumes')
        .update({
          ats_score: data.score,
          last_analyzed_at: new Date().toISOString(),
        })
        .eq('id', resumeId);

      toast.success('Analysis complete!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">ATS Analysis</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Analyze your resume against a job description to see how well it matches ATS requirements
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="job-description">Job Description (Optional)</Label>
        <Textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here for more accurate analysis..."
          rows={6}
        />
      </div>

      <Button onClick={analyzeResume} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze Resume
          </>
        )}
      </Button>

      {analysis && (
        <Card className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">ATS Compatibility Score</h4>
              <span className="text-2xl font-bold text-primary">{analysis.score}%</span>
            </div>
            <Progress value={analysis.score} className="h-2" />
          </div>

          <div>
            <h4 className="font-semibold mb-2">Detailed Analysis</h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm whitespace-pre-line">{analysis.analysis}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Analyzed on {new Date(analysis.timestamp).toLocaleString()}
            </p>
          </div>
        </Card>
      )}

      {!analysis && resumeData.ats_score && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Last ATS Score</h4>
              <p className="text-sm text-muted-foreground">
                {resumeData.last_analyzed_at && 
                  `Analyzed ${new Date(resumeData.last_analyzed_at).toLocaleDateString()}`
                }
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">{resumeData.ats_score}%</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ATSAnalysis;
