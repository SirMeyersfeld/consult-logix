
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, Activity, Weight, Ruler, LineChart, Plus, Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  AreaChart, Area, BarChart, Bar, 
  LineChart as RechartsLineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const HealthTracker = () => {
  const [activeTab, setActiveTab] = useState('vitals');
  
  const healthData = {
    vitals: [
      { date: 'Jan', heartRate: 72, bloodPressureSys: 120, bloodPressureDia: 80 },
      { date: 'Feb', heartRate: 75, bloodPressureSys: 122, bloodPressureDia: 78 },
      { date: 'Mar', heartRate: 71, bloodPressureSys: 118, bloodPressureDia: 76 },
      { date: 'Apr', heartRate: 73, bloodPressureSys: 119, bloodPressureDia: 79 },
      { date: 'May', heartRate: 70, bloodPressureSys: 121, bloodPressureDia: 77 },
      { date: 'Jun', heartRate: 74, bloodPressureSys: 123, bloodPressureDia: 81 },
    ],
    bodyMetrics: [
      { date: 'Jan', weight: 165, height: 68, bmi: 25.1 },
      { date: 'Feb', weight: 163, height: 68, bmi: 24.8 },
      { date: 'Mar', weight: 161, height: 68, bmi: 24.5 },
      { date: 'Apr', weight: 160, height: 68, bmi: 24.3 },
      { date: 'May', weight: 158, height: 68, bmi: 24.0 },
      { date: 'Jun', weight: 157, height: 68, bmi: 23.9 },
    ],
    activity: [
      { date: 'Jan', steps: 6500, calories: 2200, sleep: 7.2 },
      { date: 'Feb', steps: 7200, calories: 2100, sleep: 7.5 },
      { date: 'Mar', steps: 8100, calories: 2000, sleep: 7.8 },
      { date: 'Apr', steps: 8500, calories: 1950, sleep: 8.1 },
      { date: 'May', steps: 9200, calories: 1900, sleep: 8.0 },
      { date: 'Jun', steps: 9800, calories: 1850, sleep: 8.2 },
    ]
  };
  
  const recentMeasurements = [
    { id: 1, type: 'Heart Rate', value: '74 bpm', date: '2024-06-15', time: '8:30 AM', icon: <Heart className="h-5 w-5 text-red-500" /> },
    { id: 2, type: 'Blood Pressure', value: '123/81 mmHg', date: '2024-06-15', time: '8:30 AM', icon: <Activity className="h-5 w-5 text-blue-500" /> },
    { id: 3, type: 'Weight', value: '157 lbs', date: '2024-06-14', time: '7:15 AM', icon: <Weight className="h-5 w-5 text-green-500" /> },
    { id: 4, type: 'Sleep', value: '8.2 hrs', date: '2024-06-14', time: '6:00 AM', icon: <LineChart className="h-5 w-5 text-indigo-500" /> }
  ];
  
  const handleAddMeasurement = () => {
    toast.success('New measurement added successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Health Tracker</h1>
            <p className="text-muted-foreground max-w-2xl">
              Monitor your vital signs and health metrics over time
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-1">
            <Card className="p-5 border-border/50 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Measurements</h3>
              <div className="space-y-4">
                {recentMeasurements.map((measurement) => (
                  <div 
                    key={measurement.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {measurement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{measurement.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {measurement.date} • {measurement.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{measurement.value}</span>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2 flex items-center justify-center gap-1"
                  onClick={handleAddMeasurement}
                >
                  <Plus className="h-4 w-4" />
                  Add New Measurement
                </Button>
              </div>
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.2} className="lg:col-span-2">
            <Card className="p-5 border-border/50 shadow-sm">
              <Tabs defaultValue="vitals" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                  <TabsTrigger value="body">Body Metrics</TabsTrigger>
                  <TabsTrigger value="activity">Activity & Sleep</TabsTrigger>
                </TabsList>
                
                <TabsContent value="vitals" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={healthData.vitals}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="#ef4444" 
                        name="Heart Rate (bpm)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="bloodPressureSys" 
                        stroke="#3b82f6" 
                        name="Systolic (mmHg)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="bloodPressureDia" 
                        stroke="#8b5cf6" 
                        name="Diastolic (mmHg)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="body" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={healthData.bodyMetrics}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" domain={[20, 30]} />
                      <Tooltip />
                      <Bar 
                        yAxisId="left"
                        dataKey="weight" 
                        fill="#22c55e" 
                        name="Weight (lbs)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="bmi" 
                        stroke="#f97316" 
                        name="BMI"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="activity" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={healthData.activity}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="steps" 
                        stroke="#6366f1" 
                        fill="#6366f150" 
                        name="Steps"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sleep" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf650" 
                        name="Sleep (hrs)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </Card>
          </AnimatedTransition>
        </div>
        
        <AnimatedTransition type="fadeInUp" delay={0.3}>
          <Card className="p-5 border-border/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Health Insights</h3>
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center mb-2">
                  <Heart className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-medium text-green-800">Heart Health</h4>
                </div>
                <p className="text-sm text-green-700">Your heart rate has remained stable over the past month, indicating good cardiovascular health.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center mb-2">
                  <Weight className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-blue-800">Weight Progress</h4>
                </div>
                <p className="text-sm text-blue-700">You've consistently lost weight over the past 6 months, approaching your target BMI.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="flex items-center mb-2">
                  <Activity className="h-5 w-5 text-purple-600 mr-2" />
                  <h4 className="font-medium text-purple-800">Sleep Pattern</h4>
                </div>
                <p className="text-sm text-purple-700">Your sleep duration has improved from 7.2 to 8.2 hours, helping your overall well-being.</p>
              </div>
            </div>
          </Card>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default HealthTracker;
