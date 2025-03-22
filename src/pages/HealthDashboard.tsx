
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import HealthTips from '@/components/HealthTips';
import MedicationReminder from '@/components/MedicationReminder';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import { Button } from "@/components/ui/button";
import { ChevronRight, Activity, Heart, Syringe, ArrowRight, Flame, Pill, Calendar, Lightbulb } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const HealthDashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to view your health dashboard');
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const healthMetrics = [
    { 
      name: "Daily Steps", 
      value: 8420, 
      target: 10000, 
      progress: 84, 
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      trend: "up",
      action: () => navigate('/health-tracker')
    },
    { 
      name: "Heart Rate", 
      value: 72, 
      unit: "bpm", 
      status: "normal", 
      icon: <Heart className="h-5 w-5 text-red-500" />,
      trend: "stable",
      action: () => navigate('/health-tracker')
    },
    { 
      name: "Sleep", 
      value: 7.5, 
      unit: "hours", 
      target: 8, 
      progress: 93, 
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      trend: "up",
      action: () => navigate('/health-tracker')
    },
    { 
      name: "Vaccinations", 
      value: "Up to date", 
      status: "complete", 
      icon: <Syringe className="h-5 w-5 text-green-500" />,
      action: () => navigate('/vaccinations')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp" delay={0.2}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-1">Your Health Dashboard</h1>
            <p className="text-muted-foreground">Quick access to your important health information</p>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {healthMetrics.map((metric, index) => (
              <Card key={index} className="border-border/40 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={metric.action}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-2xl font-bold">
                    {metric.value}{metric.unit ? ` ${metric.unit}` : ""}
                  </div>
                  
                  {metric.progress && (
                    <div className="mt-2">
                      <Progress value={metric.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {metric.progress}% of daily goal
                      </p>
                    </div>
                  )}
                  
                  {metric.status && (
                    <p className={`text-sm mt-1 ${
                      metric.status === "normal" ? "text-green-500" : 
                      metric.status === "warning" ? "text-amber-500" : 
                      metric.status === "complete" ? "text-green-500" : ""
                    }`}>
                      {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  {metric.action && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-6 text-muted-foreground hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        metric.action();
                      }}
                    >
                      View details <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {metric.trend && (
                    <p className={`text-xs ${
                      metric.trend === "up" ? "text-green-500" : 
                      metric.trend === "down" ? "text-red-500" : 
                      "text-muted-foreground"
                    }`}>
                      {metric.trend === "up" ? "↑" : metric.trend === "down" ? "↓" : "→"} 
                      {metric.trend.charAt(0).toUpperCase() + metric.trend.slice(1)} from yesterday
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedTransition type="fadeInUp" delay={0.4}>
            <div className="relative">
              <div className="flex items-center mb-3">
                <Pill className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Medication Reminders</h2>
              </div>
              <MedicationReminder />
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => navigate('/medication-reminders')}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">View all medication reminders</span>
                </Button>
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.5}>
            <div className="relative">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Appointments</h2>
              </div>
              <UpcomingAppointments />
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.6}>
            <div className="relative">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-5 w-5 text-primary mr-2" />
                <h2 className="text-xl font-semibold">Health Tips</h2>
              </div>
              <HealthTips />
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => navigate('/health-tips')}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">View all health tips</span>
                </Button>
              </div>
            </div>
          </AnimatedTransition>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/telemedicine')}
          >
            <Activity className="h-4 w-4" />
            Access Telemedicine Services
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HealthDashboard;
