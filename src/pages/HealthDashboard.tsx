
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import HealthTips from '@/components/HealthTips';
import MedicationReminder from '@/components/MedicationReminder';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp" delay={0.2}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Your Health Dashboard</h1>
            <p className="text-muted-foreground">Quick access to your important health information</p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedTransition type="fadeInUp" delay={0.3}>
            <div className="relative">
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
          
          <AnimatedTransition type="fadeInUp" delay={0.4}>
            <UpcomingAppointments />
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.5}>
            <div className="relative">
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
      </main>
    </div>
  );
};

export default HealthDashboard;
