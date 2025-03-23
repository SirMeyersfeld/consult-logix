import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Utensils, Activity, Plus, Calendar, Clock, Award, LineChart, ArrowRight, Goal } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface NutritionEntry {
  id: number;
  date: string;
  time: string;
  meal: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ExerciseEntry {
  id: number;
  date: string;
  time: string;
  activity: string;
  duration: number;
  caloriesBurned: number;
  intensity: 'Low' | 'Medium' | 'High';
}

interface NutritionStats {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ExerciseStats {
  date: string;
  caloriesBurned: number;
  duration: number;
}

const NutritionExercise = () => {
  const [nutritionEntries, setNutritionEntries] = useState<NutritionEntry[]>([
    {
      id: 1,
      date: '2023-05-18',
      time: '08:30',
      meal: 'Breakfast',
      food: 'Oatmeal with berries and nuts',
      calories: 320,
      protein: 12,
      carbs: 40,
      fat: 14
    },
    {
      id: 2,
      date: '2023-05-18',
      time: '12:30',
      meal: 'Lunch',
      food: 'Grilled chicken salad',
      calories: 420,
      protein: 35,
      carbs: 20,
      fat: 18
    },
    {
      id: 3,
      date: '2023-05-18',
      time: '19:00',
      meal: 'Dinner',
      food: 'Salmon with vegetables',
      calories: 550,
      protein: 40,
      carbs: 25,
      fat: 25
    }
  ]);
  
  const [exerciseEntries, setExerciseEntries] = useState<ExerciseEntry[]>([
    {
      id: 1,
      date: '2023-05-18',
      time: '07:00',
      activity: 'Morning walk',
      duration: 30,
      caloriesBurned: 150,
      intensity: 'Low'
    },
    {
      id: 2,
      date: '2023-05-18',
      time: '17:30',
      activity: 'Strength training',
      duration: 45,
      caloriesBurned: 280,
      intensity: 'Medium'
    }
  ]);
  
  const [nutritionFormData, setNutritionFormData] = useState<Omit<NutritionEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    meal: 'Breakfast',
    food: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  
  const [exerciseFormData, setExerciseFormData] = useState<Omit<ExerciseEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    activity: '',
    duration: 0,
    caloriesBurned: 0,
    intensity: 'Medium'
  });
  
  const [nutritionDialogOpen, setNutritionDialogOpen] = useState(false);
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
  
  const handleNutritionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutritionFormData({
      ...nutritionFormData,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' || name === 'fat' 
        ? parseFloat(value) || 0 
        : value
    });
  };
  
  const handleExerciseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseFormData({
      ...exerciseFormData,
      [name]: name === 'duration' || name === 'caloriesBurned' 
        ? parseFloat(value) || 0 
        : value
    });
  };
  
  const handleAddNutrition = () => {
    if (!nutritionFormData.food || nutritionFormData.calories <= 0) {
      toast.error("Please enter food name and calories");
      return;
    }
    
    const newEntry: NutritionEntry = {
      ...nutritionFormData,
      id: Math.max(0, ...nutritionEntries.map(entry => entry.id)) + 1
    };
    
    setNutritionEntries([...nutritionEntries, newEntry]);
    toast.success("Nutrition entry added successfully!");
    setNutritionDialogOpen(false);
    
    // Reset form to defaults except keeping the date and time
    setNutritionFormData({
      ...nutritionFormData,
      meal: 'Breakfast',
      food: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  };
  
  const handleAddExercise = () => {
    if (!exerciseFormData.activity || exerciseFormData.duration <= 0) {
      toast.error("Please enter activity name and duration");
      return;
    }
    
    const newEntry: ExerciseEntry = {
      ...exerciseFormData,
      id: Math.max(0, ...exerciseEntries.map(entry => entry.id)) + 1
    };
    
    setExerciseEntries([...exerciseEntries, newEntry]);
    toast.success("Exercise entry added successfully!");
    setExerciseDialogOpen(false);
    
    // Reset form to defaults except keeping the date and time
    setExerciseFormData({
      ...exerciseFormData,
      activity: '',
      duration: 0,
      caloriesBurned: 0,
      intensity: 'Medium'
    });
  };
  
  // Generate data for charts
  const nutritionStats: NutritionStats[] = [
    { date: 'Mon', calories: 1850, protein: 90, carbs: 180, fat: 65 },
    { date: 'Tue', calories: 2100, protein: 100, carbs: 210, fat: 70 },
    { date: 'Wed', calories: 1950, protein: 95, carbs: 200, fat: 60 },
    { date: 'Thu', calories: 2200, protein: 110, carbs: 220, fat: 75 },
    { date: 'Fri', calories: 1290, protein: 87, carbs: 145, fat: 57 },
    { date: 'Sat', calories: 1790, protein: 80, carbs: 190, fat: 62 },
    { date: 'Sun', calories: 1690, protein: 75, carbs: 170, fat: 60 }
  ];
  
  const exerciseStats: ExerciseStats[] = [
    { date: 'Mon', caloriesBurned: 320, duration: 45 },
    { date: 'Tue', caloriesBurned: 450, duration: 60 },
    { date: 'Wed', caloriesBurned: 280, duration: 40 },
    { date: 'Thu', caloriesBurned: 520, duration: 70 },
    { date: 'Fri', caloriesBurned: 350, duration: 50 },
    { date: 'Sat', caloriesBurned: 600, duration: 85 },
    { date: 'Sun', caloriesBurned: 180, duration: 25 }
  ];
  
  // Calculate totals for today
  const todayNutrition = nutritionEntries.filter(entry => entry.date === new Date().toISOString().split('T')[0]);
  const todayExercise = exerciseEntries.filter(entry => entry.date === new Date().toISOString().split('T')[0]);
  
  const totalCaloriesConsumed = todayNutrition.reduce((sum, entry) => sum + entry.calories, 0);
  const totalProtein = todayNutrition.reduce((sum, entry) => sum + entry.protein, 0);
  const totalCarbs = todayNutrition.reduce((sum, entry) => sum + entry.carbs, 0);
  const totalFat = todayNutrition.reduce((sum, entry) => sum + entry.fat, 0);
  
  const totalCaloriesBurned = todayExercise.reduce((sum, entry) => sum + entry.caloriesBurned, 0);
  const totalExerciseMinutes = todayExercise.reduce((sum, entry) => sum + entry.duration, 0);
  
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Nutrition & Exercise Tracker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track your daily nutrition intake and exercise activities to monitor your health progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calories Consumed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{totalCaloriesConsumed}</div>
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Daily target: 2,000</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calories Burned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{totalCaloriesBurned}</div>
                  <Activity className="w-6 h-6 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Daily target: 500</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Net Calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{netCalories}</div>
                  <ArrowRight className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Daily target: 1,500</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Exercise Minutes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{totalExerciseMinutes}</div>
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Daily target: 30 min</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                  <CardDescription>Your nutrition and exercise trends for the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nutrition">
                    <TabsList className="mb-4">
                      <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                      <TabsTrigger value="exercise">Exercise</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="nutrition">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={nutritionStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="calories" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="protein" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="carbs" stackId="3" stroke="#ffc658" fill="#ffc658" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="exercise">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={exerciseStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip />
                            <Bar yAxisId="left" dataKey="caloriesBurned" fill="#8884d8" name="Calories Burned" />
                            <Bar yAxisId="right" dataKey="duration" fill="#82ca9d" name="Duration (min)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Macronutrient Summary</span>
                    <Award className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Protein</span>
                        <span className="text-sm">
                          {totalProtein}g / 100g
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (totalProtein / 100) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Carbs</span>
                        <span className="text-sm">
                          {totalCarbs}g / 250g
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (totalCarbs / 250) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Fat</span>
                        <span className="text-sm">{totalFat}g / 70g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(100, (totalFat / 70) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Weekly Goals</span>
                    <Goal className="w-5 h-5 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 mr-3 border-2 border-green-500 rounded-full bg-green-100">
                        <span className="text-xs text-green-500">✓</span>
                      </div>
                      <span className="text-sm">Exercise 3 times this week</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 mr-3 border-2 border-gray-300 rounded-full bg-gray-100">
                        <span className="text-xs text-gray-500">2/5</span>
                      </div>
                      <span className="text-sm">Drink 8 glasses of water daily</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 mr-3 border-2 border-gray-300 rounded-full bg-gray-100">
                        <span className="text-xs text-gray-500">1/2</span>
                      </div>
                      <span className="text-sm">Eat vegetarian meals twice</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 mr-3 border-2 border-yellow-500 rounded-full bg-yellow-100">
                        <span className="text-xs text-yellow-500">!</span>
                      </div>
                      <span className="text-sm">Limit processed foods</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Goals
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nutrition Entries */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Today's Nutrition</h2>
                <Dialog open={nutritionDialogOpen} onOpenChange={setNutritionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Meal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Nutrition Entry</DialogTitle>
                      <DialogDescription>
                        Record what you've eaten to track your nutrition intake.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input 
                            id="date" 
                            name="date" 
                            type="date" 
                            value={nutritionFormData.date}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input 
                            id="time" 
                            name="time" 
                            type="time" 
                            value={nutritionFormData.time}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="meal">Meal Type</Label>
                        <Select 
                          value={nutritionFormData.meal}
                          onValueChange={(value) => setNutritionFormData({...nutritionFormData, meal: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select meal type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                            <SelectItem value="Lunch">Lunch</SelectItem>
                            <SelectItem value="Dinner">Dinner</SelectItem>
                            <SelectItem value="Snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="food">Food/Meal Description</Label>
                        <Input 
                          id="food" 
                          name="food" 
                          placeholder="e.g., Chicken salad with quinoa" 
                          value={nutritionFormData.food}
                          onChange={handleNutritionInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="calories">Calories</Label>
                          <Input 
                            id="calories" 
                            name="calories" 
                            type="number" 
                            placeholder="e.g., 350" 
                            value={nutritionFormData.calories || ''}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="protein">Protein (g)</Label>
                          <Input 
                            id="protein" 
                            name="protein" 
                            type="number" 
                            placeholder="e.g., 25" 
                            value={nutritionFormData.protein || ''}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="carbs">Carbs (g)</Label>
                          <Input 
                            id="carbs" 
                            name="carbs" 
                            type="number" 
                            placeholder="e.g., 30" 
                            value={nutritionFormData.carbs || ''}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fat">Fat (g)</Label>
                          <Input 
                            id="fat" 
                            name="fat" 
                            type="number" 
                            placeholder="e.g., 15" 
                            value={nutritionFormData.fat || ''}
                            onChange={handleNutritionInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleAddNutrition}>Save Entry</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {nutritionEntries.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-8 text-center">
                    <Utensils className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="mb-1 text-xl font-medium">No meals recorded yet</h3>
                    <p className="mb-4 text-muted-foreground">
                      Start tracking your nutrition by adding your meals.
                    </p>
                    <Button onClick={() => setNutritionDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Meal
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {nutritionEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{entry.meal}</span>
                              <span className="text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {entry.time}
                              </span>
                            </div>
                            <h3 className="mb-1 text-lg font-medium">{entry.food}</h3>
                            <div className="flex gap-3 text-sm">
                              <span>{entry.calories} cal</span>
                              <span className="text-blue-600">{entry.protein}g protein</span>
                              <span className="text-green-500">{entry.carbs}g carbs</span>
                              <span className="text-yellow-500">{entry.fat}g fat</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-full bg-primary/10">
                            <Utensils className="w-5 h-5 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {/* Exercise Entries */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Today's Exercise</h2>
                <Dialog open={exerciseDialogOpen} onOpenChange={setExerciseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Exercise Entry</DialogTitle>
                      <DialogDescription>
                        Record your physical activities to track your fitness.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ex-date">Date</Label>
                          <Input 
                            id="ex-date" 
                            name="date" 
                            type="date" 
                            value={exerciseFormData.date}
                            onChange={handleExerciseInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ex-time">Time</Label>
                          <Input 
                            id="ex-time" 
                            name="time" 
                            type="time" 
                            value={exerciseFormData.time}
                            onChange={handleExerciseInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="activity">Activity Type</Label>
                        <Input 
                          id="activity" 
                          name="activity" 
                          placeholder="e.g., Running, Walking, Cycling" 
                          value={exerciseFormData.activity}
                          onChange={handleExerciseInputChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="intensity">Intensity</Label>
                        <Select 
                          value={exerciseFormData.intensity}
                          onValueChange={(value) => setExerciseFormData({...exerciseFormData, intensity: value as 'Low' | 'Medium' | 'High'})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select intensity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input 
                            id="duration" 
                            name="duration" 
                            type="number" 
                            placeholder="e.g., 30" 
                            value={exerciseFormData.duration || ''}
                            onChange={handleExerciseInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="caloriesBurned">Calories Burned</Label>
                          <Input 
                            id="caloriesBurned" 
                            name="caloriesBurned" 
                            type="number" 
                            placeholder="e.g., 200" 
                            value={exerciseFormData.caloriesBurned || ''}
                            onChange={handleExerciseInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleAddExercise}>Save Activity</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {exerciseEntries.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-8 text-center">
                    <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="mb-1 text-xl font-medium">No activities recorded yet</h3>
                    <p className="mb-4 text-muted-foreground">
                      Start tracking your exercise by adding activities.
                    </p>
                    <Button onClick={() => setExerciseDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Activity
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {exerciseEntries.map((entry) => (
                    <Card key={entry.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                                {entry.intensity} Intensity
                              </span>
                              <span className="text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 mr-1" />
                                {entry.time}
                              </span>
                            </div>
                            <h3 className="mb-1 text-lg font-medium">{entry.activity}</h3>
                            <div className="flex gap-3 text-sm">
                              <span>{entry.duration} minutes</span>
                              <span className="text-orange-500">{entry.caloriesBurned} calories</span>
                            </div>
                          </div>
                          <div className="p-2 rounded-full bg-orange-100">
                            <Activity className="w-5 h-5 text-orange-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default NutritionExercise;
