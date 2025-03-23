
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Goal, 
  Plus, 
  BarChart, 
  Calendar, 
  Check, 
  Trophy, 
  Clock, 
  Star, 
  Heart, 
  Footprints, 
  User, 
  DumbbellIcon, 
  Bookmark, 
  MoreHorizontal, 
  Edit,
  Trash2,
  ListChecks,
  AlertTriangle
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface HealthGoal {
  id: number;
  title: string;
  category: string;
  target: number;
  unit: string;
  current: number;
  startDate: string;
  endDate: string;
  frequency: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  notes: string;
  trackingData?: { date: string; value: number }[];
}

interface MilestoneType {
  id: number;
  goalId: number;
  title: string;
  target: number;
  achieved: boolean;
  achievedDate?: string;
}

const HealthGoals = () => {
  const [goals, setGoals] = useState<HealthGoal[]>([
    {
      id: 1,
      title: "Daily Steps Target",
      category: "activity",
      target: 10000,
      unit: "steps",
      current: 7500,
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      frequency: "daily",
      priority: 'high',
      status: 'active',
      notes: "Focus on taking the stairs and walking during lunch breaks.",
      trackingData: [
        { date: "May 1", value: 5200 },
        { date: "May 2", value: 6100 },
        { date: "May 3", value: 7300 },
        { date: "May 4", value: 5900 },
        { date: "May 5", value: 6700 },
        { date: "May 6", value: 8200 },
        { date: "May 7", value: 7500 }
      ]
    },
    {
      id: 2,
      title: "Weight Goal",
      category: "weight",
      target: 75,
      unit: "kg",
      current: 82,
      startDate: "2023-05-01",
      endDate: "2023-07-31",
      frequency: "weekly",
      priority: 'medium',
      status: 'active',
      notes: "Combining exercise with calorie reduction. Target: 0.5kg per week.",
      trackingData: [
        { date: "Week 1", value: 85 },
        { date: "Week 2", value: 84.2 },
        { date: "Week 3", value: 83.1 },
        { date: "Week 4", value: 82 }
      ]
    },
    {
      id: 3,
      title: "Water Intake",
      category: "nutrition",
      target: 2.5,
      unit: "liters",
      current: 1.8,
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      frequency: "daily",
      priority: 'medium',
      status: 'active',
      notes: "Using water bottle with time markers. Goal is 8 glasses per day.",
      trackingData: [
        { date: "May 1", value: 1.2 },
        { date: "May 2", value: 1.5 },
        { date: "May 3", value: 1.7 },
        { date: "May 4", value: 2.0 },
        { date: "May 5", value: 1.9 },
        { date: "May 6", value: 1.6 },
        { date: "May 7", value: 1.8 }
      ]
    },
    {
      id: 4,
      title: "Meditation Practice",
      category: "mental",
      target: 20,
      unit: "minutes",
      current: 15,
      startDate: "2023-05-01",
      endDate: "2023-05-31",
      frequency: "daily",
      priority: 'low',
      status: 'active',
      notes: "Morning meditation routine to reduce stress and improve focus.",
      trackingData: [
        { date: "May 1", value: 10 },
        { date: "May 2", value: 10 },
        { date: "May 3", value: 15 },
        { date: "May 4", value: 15 },
        { date: "May 5", value: 15 },
        { date: "May 6", value: 20 },
        { date: "May 7", value: 15 }
      ]
    },
    {
      id: 5,
      title: "Reduce Processed Foods",
      category: "nutrition",
      target: 0,
      unit: "servings",
      current: 2,
      startDate: "2023-05-01",
      endDate: "2023-06-30",
      frequency: "daily",
      priority: 'high',
      status: 'active',
      notes: "Focus on whole foods and home cooking to reduce processed food intake.",
      trackingData: [
        { date: "May 1", value: 4 },
        { date: "May 2", value: 3 },
        { date: "May 3", value: 3 },
        { date: "May 4", value: 2 },
        { date: "May 5", value: 2 },
        { date: "May 6", value: 2 },
        { date: "May 7", value: 2 }
      ]
    }
  ]);
  
  const milestones: MilestoneType[] = [
    {
      id: 1,
      goalId: 1,
      title: "Reach 8,000 steps daily consistently",
      target: 8000,
      achieved: false
    },
    {
      id: 2,
      goalId: 1,
      title: "First 10,000 steps day",
      target: 10000,
      achieved: false
    },
    {
      id: 3,
      goalId: 2,
      title: "Lose first 2kg",
      target: 83,
      achieved: true,
      achievedDate: "2023-05-19"
    },
    {
      id: 4,
      goalId: 2,
      title: "Halfway to goal weight",
      target: 80,
      achieved: false
    }
  ];
  
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<HealthGoal | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const [goalForm, setGoalForm] = useState<Omit<HealthGoal, 'id' | 'current' | 'trackingData'>>({
    title: '',
    category: 'activity',
    target: 0,
    unit: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    frequency: 'daily',
    priority: 'medium',
    status: 'active',
    notes: ''
  });
  
  const [trackingValue, setTrackingValue] = useState<number | ''>('');
  
  const handleUpdateTracking = (goalId: number) => {
    if (trackingValue === '') {
      toast.error("Please enter a value");
      return;
    }
    
    const value = Number(trackingValue);
    
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          current: value,
          trackingData: [
            ...(goal.trackingData || []),
            { 
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
              value 
            }
          ]
        };
      }
      return goal;
    }));
    
    setTrackingValue('');
    toast.success("Progress updated successfully!");
  };
  
  const handleSaveGoal = () => {
    if (!goalForm.title || goalForm.target === 0 || !goalForm.unit || !goalForm.endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (editingGoalId) {
      // Update existing goal
      setGoals(goals.map(goal => 
        goal.id === editingGoalId 
          ? { 
              ...goal, 
              ...goalForm
            } 
          : goal
      ));
      toast.success("Goal updated successfully!");
    } else {
      // Add new goal
      const newGoal: HealthGoal = {
        id: Math.max(0, ...goals.map(g => g.id)) + 1,
        ...goalForm,
        current: 0
      };
      
      setGoals([...goals, newGoal]);
      toast.success("New goal added successfully!");
    }
    
    setShowNewGoalDialog(false);
    setEditingGoalId(null);
    resetGoalForm();
  };
  
  const handleEditGoal = (goalId: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setGoalForm({
        title: goal.title,
        category: goal.category,
        target: goal.target,
        unit: goal.unit,
        startDate: goal.startDate,
        endDate: goal.endDate,
        frequency: goal.frequency,
        priority: goal.priority,
        status: goal.status,
        notes: goal.notes
      });
      
      setEditingGoalId(goalId);
      setShowNewGoalDialog(true);
    }
  };
  
  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    if (selectedGoal?.id === goalId) {
      setSelectedGoal(null);
    }
    toast.success("Goal deleted successfully!");
  };
  
  const resetGoalForm = () => {
    setGoalForm({
      title: '',
      category: 'activity',
      target: 0,
      unit: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      frequency: 'daily',
      priority: 'medium',
      status: 'active',
      notes: ''
    });
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'activity': return <Footprints className="h-5 w-5 text-green-500" />;
      case 'weight': return <User className="h-5 w-5 text-blue-500" />;
      case 'nutrition': return <Bookmark className="h-5 w-5 text-amber-500" />;
      case 'mental': return <Heart className="h-5 w-5 text-pink-500" />;
      case 'fitness': return <DumbbellIcon className="h-5 w-5 text-purple-500" />;
      default: return <Goal className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getProgressPercentage = (current: number, target: number) => {
    // Handle decreasing goals (like weight loss)
    if (target < current) {
      // For reduction goals, we need to calculate inversely
      const initial = goals.find(g => g.current === current)?.trackingData?.[0]?.value || current * 1.2;
      const progressMade = initial - current;
      const totalNeeded = initial - target;
      return Math.min(Math.round((progressMade / totalNeeded) * 100), 100);
    }
    
    // For increasing goals (like steps, water intake)
    return Math.min(Math.round((current / target) * 100), 100);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-amber-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'activity': return 'Physical Activity';
      case 'weight': return 'Weight Management';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Wellbeing';
      case 'fitness': return 'Fitness';
      default: return category;
    }
  };
  
  const filteredGoals = selectedCategory 
    ? goals.filter(goal => goal.category === selectedCategory)
    : goals;
  
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Last day';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };
  
  const getGoalMilestones = (goalId: number) => {
    return milestones.filter(milestone => milestone.goalId === goalId);
  };
  
  const chartColors = {
    activity: '#22c55e',
    weight: '#3b82f6',
    nutrition: '#f59e0b',
    mental: '#ec4899',
    fitness: '#a855f7'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Health Goals Tracker</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Set, track, and achieve your personal health and wellness goals.
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Goal className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">My Goals</h2>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="activity">Physical Activity</SelectItem>
                  <SelectItem value="weight">Weight Management</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="mental">Mental Wellbeing</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
                <DialogTrigger asChild>
                  <Button onClick={resetGoalForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>{editingGoalId ? 'Edit Goal' : 'Create New Health Goal'}</DialogTitle>
                    <DialogDescription>
                      {editingGoalId 
                        ? 'Update your health goal details below.' 
                        : 'Set a specific, measurable, achievable, relevant, and time-bound health goal.'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="title">Goal Title <span className="text-red-500">*</span></Label>
                        <Input 
                          id="title" 
                          value={goalForm.title}
                          onChange={(e) => setGoalForm({...goalForm, title: e.target.value})}
                          placeholder="e.g., Increase daily steps"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select 
                            value={goalForm.category} 
                            onValueChange={(value) => setGoalForm({...goalForm, category: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="activity">Physical Activity</SelectItem>
                              <SelectItem value="weight">Weight Management</SelectItem>
                              <SelectItem value="nutrition">Nutrition</SelectItem>
                              <SelectItem value="mental">Mental Wellbeing</SelectItem>
                              <SelectItem value="fitness">Fitness</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select 
                            value={goalForm.priority} 
                            onValueChange={(value) => setGoalForm({...goalForm, priority: value as 'low' | 'medium' | 'high'})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="target">Target Value <span className="text-red-500">*</span></Label>
                          <Input 
                            id="target" 
                            type="number"
                            value={goalForm.target || ''} 
                            onChange={(e) => setGoalForm({...goalForm, target: Number(e.target.value)})}
                            placeholder="e.g., 10000"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="unit">Unit <span className="text-red-500">*</span></Label>
                          <Input 
                            id="unit" 
                            value={goalForm.unit}
                            onChange={(e) => setGoalForm({...goalForm, unit: e.target.value})}
                            placeholder="e.g., steps, kg, liters"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input 
                            id="startDate" 
                            type="date"
                            value={goalForm.startDate}
                            onChange={(e) => setGoalForm({...goalForm, startDate: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="endDate">Target Date <span className="text-red-500">*</span></Label>
                          <Input 
                            id="endDate" 
                            type="date"
                            value={goalForm.endDate}
                            onChange={(e) => setGoalForm({...goalForm, endDate: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="frequency">Tracking Frequency</Label>
                        <Select 
                          value={goalForm.frequency} 
                          onValueChange={(value) => setGoalForm({...goalForm, frequency: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Notes & Strategies</Label>
                        <Textarea 
                          id="notes" 
                          value={goalForm.notes}
                          onChange={(e) => setGoalForm({...goalForm, notes: e.target.value})}
                          placeholder="How will you achieve this goal? Any specific strategies or notes?"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveGoal}>
                      {editingGoalId ? 'Update Goal' : 'Create Goal'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <Card 
                  key={goal.id} 
                  className={`overflow-hidden ${goal.status === 'completed' ? 'bg-gray-50' : ''}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(goal.category)}
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <div className={`text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority} priority
                        </div>
                        <DropdownMenu goal={goal} onEdit={handleEditGoal} onDelete={handleDeleteGoal} />
                      </div>
                    </div>
                    <CardDescription>
                      <span className="capitalize">{getCategoryLabel(goal.category)}</span>
                      {' • '}
                      <span>{getTimeRemaining(goal.endDate)}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <div className="font-medium">
                          Current: {goal.current} {goal.unit}
                        </div>
                        <div>
                          Target: {goal.target} {goal.unit}
                        </div>
                      </div>
                      <Progress 
                        value={getProgressPercentage(goal.current, goal.target)} 
                        className="h-2" 
                      />
                      <div className="text-xs text-right mt-1 text-muted-foreground">
                        {getProgressPercentage(goal.current, goal.target)}% complete
                      </div>
                    </div>
                    
                    {goal.notes && (
                      <div className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {goal.notes}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedGoal(goal)}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {goal.status === 'active' && (
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          placeholder={`Current ${goal.unit}`}
                          className="h-9 w-24 text-sm"
                          value={trackingValue}
                          onChange={(e) => setTrackingValue(e.target.value === '' ? '' : Number(e.target.value))}
                        />
                        <Button size="sm" onClick={() => handleUpdateTracking(goal.id)}>Update</Button>
                      </div>
                    )}
                    
                    {goal.status === 'completed' && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <Check className="h-4 w-4" />
                        <span>Achieved</span>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                <Goal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No goals found</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  {selectedCategory 
                    ? `You don't have any goals in the ${getCategoryLabel(selectedCategory)} category yet.` 
                    : "You haven't set any health goals yet. Get started by adding your first goal!"}
                </p>
                <Button onClick={() => setShowNewGoalDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            )}
          </div>
          
          {selectedGoal && (
            <Dialog open={selectedGoal !== null} onOpenChange={(open) => !open && setSelectedGoal(null)}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {getCategoryIcon(selectedGoal.category)}
                    {selectedGoal.title}
                  </DialogTitle>
                  <DialogDescription>
                    Detailed view and progress tracking for your goal.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Category</div>
                      <div className="font-medium">{getCategoryLabel(selectedGoal.category)}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Status</div>
                      <div className="font-medium capitalize">{selectedGoal.status}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Timeline</div>
                      <div className="font-medium">
                        {new Date(selectedGoal.startDate).toLocaleDateString()} - {new Date(selectedGoal.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">Progress</div>
                      <div className="text-sm">
                        {selectedGoal.current} / {selectedGoal.target} {selectedGoal.unit}
                      </div>
                    </div>
                    <Progress 
                      value={getProgressPercentage(selectedGoal.current, selectedGoal.target)} 
                      className="h-2.5" 
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <div>Start</div>
                      <div>{getProgressPercentage(selectedGoal.current, selectedGoal.target)}% complete</div>
                      <div>Target</div>
                    </div>
                  </div>
                  
                  {selectedGoal.trackingData && selectedGoal.trackingData.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Progress History</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={selectedGoal.trackingData}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                  offset="5%" 
                                  stopColor={chartColors[selectedGoal.category as keyof typeof chartColors] || '#3b82f6'} 
                                  stopOpacity={0.8}
                                />
                                <stop 
                                  offset="95%" 
                                  stopColor={chartColors[selectedGoal.category as keyof typeof chartColors] || '#3b82f6'} 
                                  stopOpacity={0.1}
                                />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['dataMin - 5', 'auto']} />
                            <Tooltip />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={chartColors[selectedGoal.category as keyof typeof chartColors] || '#3b82f6'} 
                              fillOpacity={1} 
                              fill="url(#colorValue)" 
                              name={selectedGoal.unit}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Milestones</h4>
                    {getGoalMilestones(selectedGoal.id).length > 0 ? (
                      <div className="space-y-2">
                        {getGoalMilestones(selectedGoal.id).map((milestone) => (
                          <div 
                            key={milestone.id} 
                            className={`p-3 rounded-md border flex items-start justify-between ${
                              milestone.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`rounded-full p-1 ${milestone.achieved ? 'bg-green-100' : 'bg-gray-200'}`}>
                                {milestone.achieved ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Trophy className="h-4 w-4 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{milestone.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {milestone.achieved ? (
                                    <>Achieved on {milestone.achievedDate}</>
                                  ) : (
                                    <>Target: {milestone.target} {selectedGoal.unit}</>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {!milestone.achieved && (
                              <Button variant="ghost" size="sm">Mark Complete</Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-3 border border-dashed rounded-md">
                        No milestones set for this goal yet
                      </div>
                    )}
                  </div>
                  
                  {selectedGoal.notes && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-1">Notes & Strategies</h4>
                      <p className="text-sm p-3 bg-gray-50 rounded-md">{selectedGoal.notes}</p>
                    </div>
                  )}
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    className="sm:flex-1"
                    onClick={() => handleEditGoal(selectedGoal.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Goal
                  </Button>
                  <Button 
                    className="sm:flex-1"
                    onClick={() => {
                      setGoals(goals.map(goal => 
                        goal.id === selectedGoal.id 
                          ? { ...goal, status: goal.status === 'completed' ? 'active' : 'completed' } 
                          : goal
                      ));
                      setSelectedGoal(null);
                      toast.success(
                        selectedGoal.status === 'completed' 
                          ? "Goal marked as active" 
                          : "Goal marked as completed!"
                      );
                    }}
                  >
                    {selectedGoal.status === 'completed' ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reactivate Goal
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Progress Summary
                </CardTitle>
                <CardDescription>Overview of your health goals progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ListChecks className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Total Goals</h3>
                    </div>
                    <div className="text-3xl font-bold">{goals.length}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active: {activeGoals.length}</span>
                      <span className="text-sm text-muted-foreground">Completed: {completedGoals.length}</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Success Rate</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {goals.length > 0 
                        ? Math.round((completedGoals.length / goals.length) * 100) 
                        : 0}%
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Based on completed goals
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Upcoming</h3>
                    </div>
                    <div className="text-3xl font-bold">
                      {activeGoals.filter(goal => {
                        const daysLeft = Math.ceil(
                          (new Date(goal.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                        );
                        return daysLeft <= 7 && daysLeft > 0;
                      }).length}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Goals due in the next 7 days
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Goals by Category</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {['activity', 'weight', 'nutrition', 'mental', 'fitness'].map((category) => {
                      const count = goals.filter(goal => goal.category === category).length;
                      return (
                        <button
                          key={category}
                          className={`p-4 border rounded-md text-center transition-colors hover:bg-gray-50 
                            ${selectedCategory === category ? 'border-primary bg-primary/5' : ''}`}
                          onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                        >
                          <div className="flex justify-center mb-2">
                            {getCategoryIcon(category)}
                          </div>
                          <div className="font-medium text-sm">{getCategoryLabel(category)}</div>
                          <div className="text-sm text-muted-foreground mt-1">{count} goals</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Goal Recommendations
                </CardTitle>
                <CardDescription>Suggestions based on your health data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-blue-100">
                      <Footprints className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Increase Daily Steps</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your current average of 7,500 steps is good, but increasing to 10,000 steps daily can further improve cardiovascular health.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Goal
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-amber-100">
                      <Clock className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Sleep Duration</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your sleep tracking shows an average of 6.5 hours. Setting a goal to increase to 7-8 hours could improve recovery and mental health.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Goal
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full p-1 bg-green-100">
                      <DumbbellIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Strength Training</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Consider adding a goal for strength training 2-3 times per week to complement your cardio activities.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Goal
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

interface DropdownMenuProps {
  goal: HealthGoal;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DropdownMenu = ({ goal, onEdit, onDelete }: DropdownMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 w-8 p-0"
        onClick={() => setShowMenu(!showMenu)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      
      {showMenu && (
        <div 
          className="absolute right-0 mt-1 w-36 rounded-md shadow-lg bg-white z-10 border"
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className="py-1">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onEdit(goal.id);
                setShowMenu(false);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the goal "{goal.title}" and all associated tracking data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(goal.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthGoals;
