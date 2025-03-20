
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import HealthTips from '@/components/HealthTips';
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ListChecks, 
  MessageCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const HealthTipsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Health Tips</h1>
              <p className="text-muted-foreground max-w-2xl">
                Daily wellness advice to help you stay healthy
              </p>
            </div>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <HealthTips />
            </AnimatedTransition>
          </div>
          
          <div className="space-y-6">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <Card className="shadow-sm border border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {['Wellness', 'Fitness', 'Nutrition', 'Mental Health'].map((category, index) => (
                      <li key={index}>
                        <Button variant="ghost" className="w-full justify-start text-left">
                          <ListChecks className="w-4 h-4 mr-2" />
                          {category}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition type="fadeInUp" delay={0.3}>
              <Card className="shadow-sm border border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Did You Know?</h3>
                  <p className="text-muted-foreground mb-4">
                    Regular physical activity can reduce your risk of heart disease by up to 35%.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Last updated: 2 days ago</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthTipsPage;
