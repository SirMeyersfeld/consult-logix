
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import MedicationReminder from '@/components/MedicationReminder';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Bell, Clock, PlusCircle } from 'lucide-react';

const MedicationRemindersPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Medication Reminders</h1>
              <p className="text-muted-foreground max-w-2xl">
                Stay on track with your medication schedule
              </p>
            </div>
            
            <Button 
              onClick={() => navigate('/add-medication')}
              className="mt-4 md:mt-0 flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              Add Medication
            </Button>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <MedicationReminder />
            </AnimatedTransition>
          </div>
          
          <div className="space-y-6">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <Card className="shadow-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between bg-primary/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary h-4 w-4" />
                        <span>8:00 AM</span>
                      </div>
                      <span className="font-medium">Lisinopril</span>
                    </li>
                    <li className="flex items-center justify-between bg-primary/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary h-4 w-4" />
                        <span>1:00 PM</span>
                      </div>
                      <span className="font-medium">Metformin</span>
                    </li>
                    <li className="flex items-center justify-between bg-primary/5 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="text-primary h-4 w-4" />
                        <span>8:00 PM</span>
                      </div>
                      <span className="font-medium">Atorvastatin</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition type="fadeInUp" delay={0.3}>
              <Card className="shadow-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Reminder Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    You'll receive notifications 30 minutes before each scheduled medication.
                  </p>
                  <Button variant="outline" size="sm">
                    Customize Reminders
                  </Button>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MedicationRemindersPage;
