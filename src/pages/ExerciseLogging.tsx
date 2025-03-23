
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dumbbell, Plus, Activity, Flame, Heart, Trash2 } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface ExerciseEntry {
  id: string;
  type: string;
  duration: number;
  intensity: string;
  calories: number;
  date: string;
}

const ExerciseLogging = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('medium');
  const [exerciseLog, setExerciseLog] = useState<ExerciseEntry[]>([
    {
      id: '1',
      type: 'Running',
      duration: 30,
      intensity: 'high',
      calories: 350,
      date: '2023-06-15'
    },
    {
      id: '2',
      type: 'Yoga',
      duration: 45,
      intensity: 'low',
      calories: 180,
      date: '2023-06-14'
    },
    {
      id: '3',
      type: 'Cycling',
      duration: 60,
      intensity: 'medium',
      calories: 500,
      date: '2023-06-13'
    }
  ]);

  const calculateCalories = (type: string, duration: number, intensity: string): number => {
    // Simple calorie calculation (in a real app, this would be more sophisticated)
    const baseRate = type === 'Running' ? 10 : 
                     type === 'Cycling' ? 8 : 
                     type === 'Swimming' ? 9 : 
                     type === 'Yoga' ? 4 : 
                     type === 'Weights' ? 6 : 5;
    
    const intensityMultiplier = intensity === 'low' ? 0.8 : 
                               intensity === 'high' ? 1.3 : 1;
    
    return Math.round(baseRate * duration * intensityMultiplier);
  };

  const handleAddExercise = () => {
    if (!exerciseType) {
      toast.error('Please select an exercise type');
      return;
    }

    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      toast.error('Please enter a valid duration');
      return;
    }

    const durationNum = Number(duration);
    const calories = calculateCalories(exerciseType, durationNum, intensity);
    
    const newEntry: ExerciseEntry = {
      id: Date.now().toString(),
      type: exerciseType,
      duration: durationNum,
      intensity,
      calories,
      date: new Date().toISOString().split('T')[0]
    };

    setExerciseLog([newEntry, ...exerciseLog]);
    setExerciseType('');
    setDuration('');
    setIntensity('medium');
    
    toast.success('Exercise logged successfully!');
  };

  const handleDeleteExercise = (id: string) => {
    setExerciseLog(exerciseLog.filter(entry => entry.id !== id));
    toast.success('Exercise entry deleted');
  };

  const getTotalCalories = () => {
    return exerciseLog.reduce((total, entry) => total + entry.calories, 0);
  };
  
  const getTotalDuration = () => {
    return exerciseLog.reduce((total, entry) => total + entry.duration, 0);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-amber-500';
      case 'high':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />

      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Exercise Logging</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your workouts and monitor your fitness progress over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Log a New Exercise</CardTitle>
                <CardDescription>Record your workout details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exerciseType">Exercise Type</Label>
                    <Select value={exerciseType} onValueChange={setExerciseType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exercise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Running">Running</SelectItem>
                        <SelectItem value="Cycling">Cycling</SelectItem>
                        <SelectItem value="Swimming">Swimming</SelectItem>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Weights">Weight Training</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      value={duration} 
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Enter duration" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="intensity">Intensity</Label>
                    <Select value={intensity} onValueChange={setIntensity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddExercise} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Exercise
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workout Summary</CardTitle>
                <CardDescription>Your exercise statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                    <Flame className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">{getTotalCalories()}</span>
                    <span className="text-xs text-muted-foreground">Calories Burned</span>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <span className="text-2xl font-bold">{getTotalDuration()}</span>
                    <span className="text-xs text-muted-foreground">Total Minutes</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-primary/10 rounded-lg p-4">
                  <Heart className="h-8 w-8 text-red-500 mb-2" />
                  <span className="text-lg font-medium">Great progress!</span>
                  <span className="text-xs text-muted-foreground text-center">
                    You're on track to meet your fitness goals
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exercise History</CardTitle>
              <CardDescription>Recent workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Exercise</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Intensity</TableHead>
                      <TableHead>Calories</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exerciseLog.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell className="font-medium flex items-center gap-2">
                          <Dumbbell className="h-4 w-4 text-primary" />
                          {entry.type}
                        </TableCell>
                        <TableCell>{entry.duration} min</TableCell>
                        <TableCell className={getIntensityColor(entry.intensity)}>
                          {entry.intensity.charAt(0).toUpperCase() + entry.intensity.slice(1)}
                        </TableCell>
                        <TableCell>{entry.calories} kcal</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteExercise(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default ExerciseLogging;
