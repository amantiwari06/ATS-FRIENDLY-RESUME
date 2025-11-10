import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  resume: any;
}

const ResumePreview = ({ resume }: ResumePreviewProps) => {
  const { personal_info, experience, education, skills } = resume;

  return (
    <Card className="p-8 bg-white text-black">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b-2 border-primary pb-4">
          <h1 className="text-3xl font-bold text-primary">
            {personal_info?.full_name || 'Your Name'}
          </h1>
          <h2 className="text-xl text-accent mt-1">
            {personal_info?.job_title || 'Job Title'}
          </h2>
          
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            {personal_info?.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {personal_info.email}
              </div>
            )}
            {personal_info?.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {personal_info.phone}
              </div>
            )}
            {personal_info?.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {personal_info.location}
              </div>
            )}
            {personal_info?.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                {personal_info.linkedin}
              </div>
            )}
            {personal_info?.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {personal_info.website}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {personal_info?.summary && (
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">PROFESSIONAL SUMMARY</h3>
            <p className="text-sm leading-relaxed">{personal_info.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">EXPERIENCE</h3>
            <div className="space-y-4">
              {experience.map((exp: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{exp.position}</h4>
                      <p className="text-sm text-accent">{exp.company}</p>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <p>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-2 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-primary mb-3">EDUCATION</h3>
            <div className="space-y-3">
              {education.map((edu: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">{edu.school}</h4>
                      <p className="text-sm">{edu.degree} in {edu.field}</p>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <p>{edu.start_date} - {edu.end_date}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span key={index} className="text-sm px-3 py-1 bg-secondary rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
