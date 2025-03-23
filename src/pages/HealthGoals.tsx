
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  RotateCw,
  Plus,
  Check,
} from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

const HealthGoals = () => {
  const [goals, setGoals] = useState({
    steps: {
      current: 8765,
      goal: 10000,
      completed: false
    },
    water: {
      current: 6,
      goal: 8,
      completed: false
    },
    activeMinutes: {
      current: 25,
      goal: 30,
      completed: false
    }
  });

  const handleCompleteSteps = () => {
    setGoals(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        completed: true
      }
    }));
    toast.success('Steps goal marked as complete!');
  };

  const handleAddWater = () => {
    const newCurrent = Math.min(goals.water.current + 1, goals.water.goal);
    const completed = newCurrent === goals.water.goal;
    
    setGoals(prev => ({
      ...prev,
      water: {
        ...prev.water,
        current: newCurrent,
        completed
      }
    }));
    
    if (completed) {
      toast.success('Water intake goal achieved!');
    } else {
      toast.success('Water intake updated!');
    }
  };

  const handleSyncActivity = () => {
    toast.success('Syncing activity data...');
    
    // Simulate a sync with a delay
    setTimeout(() => {
      const newActiveMinutes = Math.min(goals.activeMinutes.current + 5, goals.activeMinutes.goal);
      const completed = newActiveMinutes === goals.activeMinutes.goal;
      
      setGoals(prev => ({
        ...prev,
        activeMinutes: {
          ...prev.activeMinutes,
          current: newActiveMinutes,
          completed
        }
      }));
      
      if (completed) {
        toast.success('Activity synced! Active minutes goal achieved!');
      } else {
        toast.success('Activity synced! Active minutes updated.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />

      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Health Goals</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Set and track your health goals to stay motivated and improve your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Steps</CardTitle>
                <CardDescription>Track your daily step count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{goals.steps.current.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  Goal: {goals.steps.goal.toLocaleString()} steps
                </p>
                <Button 
                  className="mt-4 w-full"
                  disabled={goals.steps.completed}
                  onClick={handleCompleteSteps}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {goals.steps.completed ? 'Completed' : 'Mark as Complete'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Intake</CardTitle>
                <CardDescription>Log your daily water consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{goals.water.current}/{goals.water.goal}</div>
                <p className="text-sm text-muted-foreground">
                  Glasses of water
                </p>
                <Button 
                  className="mt-4 w-full"
                  disabled={goals.water.completed || goals.water.current >= goals.water.goal}
                  onClick={handleAddWater}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Glass
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Minutes</CardTitle>
                <CardDescription>Track your daily active minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{goals.activeMinutes.current}</div>
                <p className="text-sm text-muted-foreground">
                  Goal: {goals.activeMinutes.goal} minutes
                </p>
                <Button 
                  className="mt-4 w-full"
                  onClick={handleSyncActivity}
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Sync Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default HealthGoals;
