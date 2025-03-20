
import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedTransition from '@/components/AnimatedTransition';

interface Tip {
  id: number;
  title: string;
  content: string;
  category: string;
}

const HealthTips = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const healthTips: Tip[] = [
    {
      id: 1,
      title: "Stay Hydrated",
      content: "Drink at least 8 glasses of water daily to keep your body functioning at its best.",
      category: "Wellness"
    },
    {
      id: 2,
      title: "Regular Exercise",
      content: "Aim for at least 30 minutes of moderate physical activity every day.",
      category: "Fitness"
    },
    {
      id: 3,
      title: "Sleep Well",
      content: "Adults should aim for 7-9 hours of quality sleep per night for optimal health.",
      category: "Wellness"
    },
    {
      id: 4,
      title: "Mindful Eating",
      content: "Pay attention to what and when you eat, and enjoy your meals without distractions.",
      category: "Nutrition"
    },
    {
      id: 5,
      title: "Stress Management",
      content: "Practice deep breathing, meditation, or yoga to reduce stress levels.",
      category: "Mental Health"
    }
  ];

  useEffect(() => {
    // Simulate loading from an API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === healthTips.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousTip = () => {
    setCurrentTipIndex((prevIndex) => 
      prevIndex === 0 ? healthTips.length - 1 : prevIndex - 1
    );
  };

  const currentTip = healthTips[currentTipIndex];

  if (isLoading) {
    return (
      <Card className="w-full bg-white shadow-sm border border-border/50">
        <CardContent className="p-6 space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <AnimatedTransition type="fadeInUp">
      <Card className="w-full bg-white shadow-sm border border-border/50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{currentTip.title}</h3>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {currentTip.category}
                </span>
              </div>
              <p className="text-muted-foreground">{currentTip.content}</p>
              <div className="flex justify-between pt-4">
                <Button variant="outline" size="sm" onClick={previousTip}>
                  Previous Tip
                </Button>
                <Button variant="outline" size="sm" onClick={nextTip}>
                  Next Tip
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedTransition>
  );
};

export default HealthTips;
