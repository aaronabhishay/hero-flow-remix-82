import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Download, Filter, Search, User, Mail, Phone, MapPin, Star, TrendingUp, Eye, Calendar, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("score");
  const [filterScore, setFilterScore] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      score: 94,
      rank: 1,
      skills: ["Python", "Machine Learning", "TensorFlow", "AWS", "SQL"],
      experience: "5 years",
      education: "MS Computer Science - Stanford",
      summary: "Experienced data scientist with expertise in ML model development and deployment. Led 3 successful AI projects resulting in $2M+ cost savings.",
      matchReasons: [
        "Strong Python and ML experience (95% match)",
        "Relevant AWS cloud experience",
        "Published research in NLP",
        "Team leadership experience"
      ]
    },
    {
      id: 2,
      name: "David Rodriguez",
      email: "d.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      score: 89,
      rank: 2,
      skills: ["Python", "R", "Deep Learning", "Docker", "GCP"],
      experience: "4 years",
      education: "PhD Statistics - UT Austin",
      summary: "PhD statistician with strong background in deep learning and statistical modeling. Specialized in computer vision applications.",
      matchReasons: [
        "Advanced statistical background",
        "Deep learning specialization",
        "Strong analytical skills",
        "Research publication record"
      ]
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.j@email.com",
      phone: "+1 (555) 345-6789",
      location: "Seattle, WA",
      score: 82,
      rank: 3,
      skills: ["Python", "Spark", "Hadoop", "Tableau", "Azure"],
      experience: "6 years",
      education: "MS Data Science - UW",
      summary: "Senior data engineer with expertise in big data processing and visualization. Built scalable data pipelines serving millions of users.",
      matchReasons: [
        "Big data processing expertise",
        "Scalable system design",
        "Data visualization skills",
        "Cross-functional collaboration"
      ]
    },
    {
      id: 4,
      name: "Michael Zhang",
      email: "m.zhang@email.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      score: 76,
      rank: 4,
      skills: ["Python", "Scikit-learn", "PostgreSQL", "Git", "Jupyter"],
      experience: "3 years",
      education: "BS Mathematics - Columbia",
      summary: "Junior data scientist with solid foundation in statistical analysis and machine learning. Recent bootcamp graduate with portfolio of ML projects.",
      matchReasons: [
        "Strong mathematical foundation",
        "Recent ML training",
        "Portfolio of relevant projects",
        "Eager to learn and grow"
      ]
    }
  ];

  const jobAnalysis = {
    title: "Senior Data Scientist",
    totalCandidates: candidates.length,
    avgScore: Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length),
    topSkills: ["Python", "Machine Learning", "Statistics", "SQL", "Cloud Platforms"],
    analyzedAt: "2 hours ago"
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-blue-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    return "outline";
  };

  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesScore = filterScore === "all" ||
                          (filterScore === "90+" && candidate.score >= 90) ||
                          (filterScore === "80+" && candidate.score >= 80) ||
                          (filterScore === "70+" && candidate.score >= 70);
      return matchesSearch && matchesScore;
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.rank - b.rank;
    });

  const handleBack = () => {
    navigate("/analysis");
  };

  const handleScheduleInterview = (candidateId: number) => {
    console.log("Schedule interview for candidate:", candidateId);
  };

  const handleBulkScheduleInterviews = () => {
    console.log("Schedule interviews for candidates:", selectedCandidates);
  };

  const toggleCandidateSelection = (candidateId: number) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const selectAllCandidates = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
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
              Back to Analysis
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Candidate Results
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {jobAnalysis.analyzedAt}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Floating background elements */}
        <div className="floating-orb opacity-5"></div>
        <div className="floating-orb-delayed opacity-3"></div>

        {/* Analysis Summary */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{jobAnalysis.title}</CardTitle>
                <CardDescription>Analysis completed {jobAnalysis.analyzedAt}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{jobAnalysis.totalCandidates}</div>
                <div className="text-sm text-muted-foreground">Candidates Analyzed</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-primary mb-1">{jobAnalysis.avgScore}%</div>
                <div className="text-sm text-muted-foreground">Average Match Score</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {candidates.filter(c => c.score >= 80).length}
                </div>
                <div className="text-sm text-muted-foreground">Strong Matches (80%+)</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {candidates.filter(c => c.score >= 90).length}
                </div>
                <div className="text-sm text-muted-foreground">Excellent Matches (90%+)</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border/30">
              <h4 className="font-medium mb-3">Top Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {jobAnalysis.topSkills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters, Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates by name or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score">Sort by Score</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="rank">Sort by Rank</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterScore} onValueChange={setFilterScore}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="90+">90%+ Match</SelectItem>
              <SelectItem value="80+">80%+ Match</SelectItem>
              <SelectItem value="70+">70%+ Match</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <Card className="glass-card mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedCandidates.length} candidate(s) selected
                </span>
                <Button
                  onClick={handleBulkScheduleInterviews}
                  className="premium-button"
                  size="sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interviews
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {viewMode === "cards" ? (
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="glass-card hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                      />
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{candidate.name}</h3>
                        <p className="text-muted-foreground">{candidate.experience} experience • {candidate.education}</p>
                      </div>
                    </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getScoreBadgeVariant(candidate.score)} className="text-lg px-3 py-1">
                        #{candidate.rank}
                      </Badge>
                      <div className={`text-3xl font-bold ${getScoreColor(candidate.score)}`}>
                        {candidate.score}%
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="analysis">Match Analysis</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <p className="text-muted-foreground">{candidate.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {candidate.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {candidate.location}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="mt-4">
                    <div className="space-y-3">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Why this candidate matches:
                      </h4>
                      <ul className="space-y-2">
                        {candidate.matchReasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-border/30">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                  <Button 
                    onClick={() => handleScheduleInterview(candidate.id)}
                    className="premium-button"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onCheckedChange={selectAllCandidates}
                    />
                  </TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedCandidates.includes(candidate.id)}
                        onCheckedChange={() => toggleCandidateSelection(candidate.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.experience} • {candidate.education}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {candidate.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">+{candidate.skills.length - 3}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={getScoreBadgeVariant(candidate.score)} className="text-xs">
                          #{candidate.rank}
                        </Badge>
                        <span className={`font-bold ${getScoreColor(candidate.score)}`}>
                          {candidate.score}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          onClick={() => handleScheduleInterview(candidate.id)}
                          className="premium-button"
                          size="sm"
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {filteredCandidates.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Results;