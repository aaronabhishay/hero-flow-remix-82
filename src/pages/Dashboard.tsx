import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Users, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalAnalyses: 12,
    candidatesReviewed: 148,
    avgMatchScore: 78,
    activeJobs: 3
  });

  const recentAnalyses = [
    {
      id: 1,
      title: "Senior React Developer",
      candidates: 24,
      avgScore: 82,
      status: "completed",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Data Scientist - ML",
      candidates: 18,
      avgScore: 75,
      status: "processing",
      date: "4 hours ago"
    },
    {
      id: 3,
      title: "Product Manager",
      candidates: 31,
      avgScore: 69,
      status: "completed",
      date: "1 day ago"
    }
  ];

  const handleNewAnalysis = () => {
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Resume Ranker
            </h1>
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost" size="sm">Dashboard</Button>
              <Button variant="ghost" size="sm">Saved Jobs</Button>
              <Button variant="ghost" size="sm">Templates</Button>
            </div>
          </div>
          <Button onClick={handleNewAnalysis} className="premium-button">
            <Plus className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="floating-orb opacity-20"></div>
          <div className="floating-orb-delayed opacity-15"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Your{" "}
              <span className="gradient-text">AI-Powered</span>{" "}
              Recruitment Hub
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Streamline your hiring process with intelligent resume analysis and candidate matching
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="glass-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalAnalyses}</div>
                <div className="text-sm text-muted-foreground">Total Analyses</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stats.candidatesReviewed}</div>
                <div className="text-sm text-muted-foreground">Candidates Reviewed</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stats.avgMatchScore}%</div>
                <div className="text-sm text-muted-foreground">Avg Match Score</div>
              </CardContent>
            </Card>
            <Card className="glass-card text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{stats.activeJobs}</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Actions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Start a new analysis or manage your existing ones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleNewAnalysis}
                    className="w-full premium-button justify-start" 
                    size="lg"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Start New Resume Analysis
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <Users className="h-4 w-4 mr-2" />
                    Import Candidates
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest resume analyses and results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{analysis.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {analysis.candidates} candidates • {analysis.avgScore}% avg score
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={analysis.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {analysis.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{analysis.date}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>
                  Detailed view of your recent resume analysis sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis) => (
                    <div key={analysis.id} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{analysis.title}</h3>
                        <Badge variant={analysis.status === 'completed' ? 'default' : 'secondary'}>
                          {analysis.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Candidates: </span>
                          <span className="font-medium">{analysis.candidates}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Score: </span>
                          <span className="font-medium">{analysis.avgScore}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date: </span>
                          <span className="font-medium">{analysis.date}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <Button size="sm" variant="outline">View Results</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>
                  Performance metrics and insights from your analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed insights and performance metrics will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;