import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Calendar, Activity as ActivityIcon, Pill, FlaskConical, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';

const Activity = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [activities, setActivities] = useState([
    { id: 1, type: "Consultation", doctor: "Dr. Sarah Johnson", date: "2024-05-01", description: "Heart checkup", category: "consultation" },
    { id: 2, type: "Prescription", doctor: "Dr. Michael Lee", date: "2024-04-28", description: "Skin treatment medication", category: "prescription" },
    { id: 3, type: "Lab Results", doctor: "Dr. Emily Wong", date: "2024-04-20", description: "Blood work analysis", category: "lab" },
    { id: 4, type: "Consultation", doctor: "Dr. Robert Chen", date: "2024-04-15", description: "Neurological assessment", category: "consultation" },
    { id: 5, type: "Prescription", doctor: "Dr. Sarah Johnson", date: "2024-04-10", description: "Blood pressure medication refill", category: "prescription" },
    { id: 6, type: "Lab Results", doctor: "Dr. Lisa Williams", date: "2024-04-05", description: "Cholesterol screening", category: "lab" },
    { id: 7, type: "Consultation", doctor: "Dr. Michael Lee", date: "2024-03-28", description: "Skin condition follow-up", category: "consultation" },
    { id: 8, type: "Prescription", doctor: "Dr. Emily Wong", date: "2024-03-20", description: "Antibiotic prescription", category: "prescription" },
    { id: 9, type: "Lab Results", doctor: "Dr. Robert Chen", date: "2024-03-15", description: "MRI results review", category: "lab" }
  ]);

  const categoryColors = {
    consultation: "#4f46e5",
    prescription: "#10b981",
    lab: "#f59e0b"
  };

  const activityCounts = {
    consultation: activities.filter(a => a.category === "consultation").length,
    prescription: activities.filter(a => a.category === "prescription").length,
    lab: activities.filter(a => a.category === "lab").length
  };

  const pieData = [
    { name: 'Consultations', value: activityCounts.consultation, color: categoryColors.consultation },
    { name: 'Prescriptions', value: activityCounts.prescription, color: categoryColors.prescription },
    { name: 'Lab Results', value: activityCounts.lab, color: categoryColors.lab }
  ];

  const monthlyData = [
    { name: 'Jan', consultation: 2, prescription: 1, lab: 1 },
    { name: 'Feb', consultation: 1, prescription: 3, lab: 2 },
    { name: 'Mar', consultation: 3, prescription: 2, lab: 1 },
    { name: 'Apr', consultation: 2, prescription: 2, lab: 2 },
    { name: 'May', consultation: 1, prescription: 1, lab: 0 }
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      toast.error('Please sign in to view your activity');
      navigate('/sign-in');
    }
  }, [navigate]);

  const filteredActivities = activities
    .filter(activity => filter === 'all' || activity.category === filter)
    .filter(activity => 
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'consultation':
        return <FileText className="h-5 w-5" style={{ color: categoryColors.consultation }} />;
      case 'prescription':
        return <Pill className="h-5 w-5" style={{ color: categoryColors.prescription }} />;
      case 'lab':
        return <FlaskConical className="h-5 w-5" style={{ color: categoryColors.lab }} />;
      default:
        return <ActivityIcon className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Activity History</h1>
            <p className="text-muted-foreground max-w-2xl">
              Track and review your medical activities including consultations, prescriptions, and lab results
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex justify-around mt-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-center">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">{entry.name}</p>
                        <p className="font-semibold">{entry.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
              
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Monthly Trends</h2>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consultation" name="Consultations" fill={categoryColors.consultation} />
                        <Bar dataKey="prescription" name="Prescriptions" fill={categoryColors.prescription} />
                        <Bar dataKey="lab" name="Lab Results" fill={categoryColors.lab} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.2} className="lg:col-span-2">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <Tabs defaultValue="all" className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <TabsList>
                    <TabsTrigger 
                      value="all" 
                      onClick={() => setFilter('all')}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger 
                      value="consultation" 
                      onClick={() => setFilter('consultation')}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Consultations
                    </TabsTrigger>
                    <TabsTrigger 
                      value="prescription" 
                      onClick={() => setFilter('prescription')}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Prescriptions
                    </TabsTrigger>
                    <TabsTrigger 
                      value="lab" 
                      onClick={() => setFilter('lab')}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Lab Results
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-full"
                    />
                  </div>
                </div>

                <TabsContent value="all" className="space-y-4 mt-0">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className="flex items-start p-4 border border-border/50 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <div className="mr-4 p-2 bg-primary/10 rounded-full">
                          {getCategoryIcon(activity.category)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{activity.type}</h3>
                              <p className="text-sm">{activity.doctor}</p>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(activity.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                      <p className="text-muted-foreground">No activities found</p>
                      {searchTerm && (
                        <Button 
                          variant="ghost" 
                          className="mt-2" 
                          onClick={() => setSearchTerm('')}
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="consultation" className="space-y-4 mt-0">
                  {/* Same content structure as "all" tab, filtered for consultations */}
                </TabsContent>
                
                <TabsContent value="prescription" className="space-y-4 mt-0">
                  {/* Same content structure as "all" tab, filtered for prescriptions */}
                </TabsContent>
                
                <TabsContent value="lab" className="space-y-4 mt-0">
                  {/* Same content structure as "all" tab, filtered for lab results */}
                </TabsContent>
              </Tabs>
            </Card>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Activity;
