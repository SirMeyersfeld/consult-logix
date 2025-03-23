import React from 'react';
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

const HealthGoals = () => {
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
                <div className="text-3xl font-bold">8,765</div>
                <p className="text-sm text-muted-foreground">
                  Goal: 10,000 steps
                </p>
                <Button className="mt-4 w-full">
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Intake</CardTitle>
                <CardDescription>Log your daily water consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">6/8</div>
                <p className="text-sm text-muted-foreground">
                  Glasses of water
                </p>
                <Button className="mt-4 w-full">
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
                <div className="text-3xl font-bold">25</div>
                <p className="text-sm text-muted-foreground">
                  Goal: 30 minutes
                </p>
                <Button className="mt-4 w-full">
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
