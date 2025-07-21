import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Upload, Link, FileText, Settings, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("mid");
  const [useTemplate, setUseTemplate] = useState("template");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const jobTemplates = [
    {
      id: "data-scientist",
      title: "Data Scientist",
      description: "Develop and implement machine learning models and algorithms\n- Analyze large datasets to extract meaningful insights\n- Create data-driven solutions for business problems\n- Collaborate with cross-functional teams to identify opportunities"
    },
    {
      id: "software-engineer",
      title: "Software Engineer",
      description: "Design and develop scalable software applications\n- Write clean, maintainable code using modern frameworks\n- Collaborate with product teams to deliver features\n- Participate in code reviews and technical discussions"
    },
    {
      id: "product-manager",
      title: "Product Manager",
      description: "Define product strategy and roadmap\n- Work with engineering and design teams\n- Analyze market trends and user feedback\n- Drive product development from concept to launch"
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = jobTemplates.find(t => t.id === templateId);
    if (template) {
      setJobDescription(template.description);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results page
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Job Analysis
            </h1>
          </div>
          <Badge variant="secondary">Step {currentStep} of 2</Badge>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <div className={`h-0.5 w-20 ${currentStep > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Job Details</span>
            <span>Resume Upload</span>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-8">
            {/* Floating background elements */}
            <div className="floating-orb opacity-10"></div>
            <div className="floating-orb-delayed opacity-5"></div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Analyze New Job
                </CardTitle>
                <CardDescription>
                  Enter job details to find the best matching candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Experience Level */}
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-base font-medium">Experience Level</Label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                      <SelectItem value="executive">Executive Level (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Description Type */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Job Description</Label>
                  <RadioGroup value={useTemplate} onValueChange={setUseTemplate}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="template" id="template" />
                      <Label htmlFor="template">Use Template</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Job Description</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Template Selection */}
                {useTemplate === "template" && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select Template</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {jobTemplates.map((template) => (
                        <Button
                          key={template.id}
                          variant={selectedTemplate === template.id ? "default" : "outline"}
                          className="h-auto p-4 text-left justify-start"
                          onClick={() => handleTemplateSelect(template.id)}
                        >
                          <div>
                            <div className="font-medium">{template.title}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Description */}
                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-medium">
                    {useTemplate === "template" ? "Job Description Preview" : "Job Description"}
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed job description, required skills, and qualifications..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[200px] resize-none"
                    disabled={useTemplate === "template" && !selectedTemplate}
                  />
                </div>

                {/* Scoring Logic */}
                <div className="pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Edit Scoring Logic
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Customize how resumes are scored and ranked
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={handleNext} 
                disabled={!jobDescription.trim()}
                className="premium-button"
                size="lg"
              >
                Continue to Upload
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Resume Upload
                </CardTitle>
                <CardDescription>
                  Upload resumes or connect to your Google Drive folder
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="drive" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="drive" className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Google Drive
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Direct Upload
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="drive" className="space-y-4 mt-6">
                    <div className="space-y-3">
                      <Label className="text-base font-medium">Google Drive Folder Link</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 justify-start">
                          <Link className="h-4 w-4 mr-2" />
                          Select from folders
                        </Button>
                        <Button variant="outline">Custom link</Button>
                      </div>
                    </div>

                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a folder..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data-analyst">Data Analyst Resumes</SelectItem>
                        <SelectItem value="software-engineer">Software Engineer Resumes</SelectItem>
                        <SelectItem value="product-manager">Product Manager Resumes</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-200 flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Make sure the folder is shared with the service account email
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="space-y-4 mt-6">
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Upload Resume Files</h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop files here, or click to browse
                      </p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Supported formats: PDF, DOCX, TXT
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back to Job Details
              </Button>
              <Button onClick={handleNext} className="premium-button" size="lg">
                Analyze Resumes
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;