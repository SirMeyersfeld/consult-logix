
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Watch,
  Heart,
  Activity,
  Moon,
  BarChart4,
  Footprints,
  Battery,
  RotateCw,
  Smartphone,
  Gauge,
  Plus,
  Check,
  Clock,
  LineChart
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Device {
  id: number;
  name: string;
  type: string;
  icon: React.ReactNode;
  isConnected: boolean;
  batteryLevel: number;
  lastSync: string;
}

interface HealthData {
  time: string;
  heartRate: number;
  steps: number;
  calories: number;
  distance: number;
  activityMinutes: number;
  sleepHours: number;
}

const WearableIntegration = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: "Apple Watch Series 7",
      type: "smartwatch",
      icon: <Watch className="h-8 w-8 text-gray-800" />,
      isConnected: true,
      batteryLevel: 68,
      lastSync: "10 minutes ago"
    },
    {
      id: 2,
      name: "Fitbit Charge 5",
      type: "fitness-tracker",
      icon: <Activity className="h-8 w-8 text-gray-800" />,
      isConnected: false,
      batteryLevel: 45,
      lastSync: "2 days ago"
    },
    {
      id: 3,
      name: "Oura Ring Gen 3",
      type: "sleep-tracker",
      icon: <Moon className="h-8 w-8 text-gray-800" />,
      isConnected: true,
      batteryLevel: 82,
      lastSync: "3 hours ago"
    }
  ]);
  
  const [showAvailableDevices, setShowAvailableDevices] = useState(false);
  
  // Sample health data (7 days)
  const weeklyData: HealthData[] = [
    { time: "Mon", heartRate: 72, steps: 8734, calories: 2145, distance: 5.8, activityMinutes: 35, sleepHours: 7.2 },
    { time: "Tue", heartRate: 74, steps: 10243, calories: 2350, distance: 6.7, activityMinutes: 48, sleepHours: 6.8 },
    { time: "Wed", heartRate: 71, steps: 7652, calories: 2100, distance: 5.1, activityMinutes: 28, sleepHours: 7.5 },
    { time: "Thu", heartRate: 73, steps: 9145, calories: 2280, distance: 6.2, activityMinutes: 42, sleepHours: 7.0 },
    { time: "Fri", heartRate: 75, steps: 11456, calories: 2420, distance: 7.6, activityMinutes: 55, sleepHours: 6.5 },
    { time: "Sat", heartRate: 70, steps: 6234, calories: 1980, distance: 4.1, activityMinutes: 22, sleepHours: 8.1 },
    { time: "Sun", heartRate: 69, steps: 5678, calories: 1875, distance: 3.8, activityMinutes: 18, sleepHours: 8.4 }
  ];
  
  // Heart rate data (24 hours)
  const heartRateData = [
    { time: "00:00", rate: 62 },
    { time: "01:00", rate: 58 },
    { time: "02:00", rate: 56 },
    { time: "03:00", rate: 55 },
    { time: "04:00", rate: 57 },
    { time: "05:00", rate: 61 },
    { time: "06:00", rate: 70 },
    { time: "07:00", rate: 82 },
    { time: "08:00", rate: 76 },
    { time: "09:00", rate: 72 },
    { time: "10:00", rate: 74 },
    { time: "11:00", rate: 78 },
    { time: "12:00", rate: 82 },
    { time: "13:00", rate: 76 },
    { time: "14:00", rate: 73 },
    { time: "15:00", rate: 71 },
    { time: "16:00", rate: 74 },
    { time: "17:00", rate: 85 },
    { time: "18:00", rate: 92 },
    { time: "19:00", rate: 78 },
    { time: "20:00", rate: 72 },
    { time: "21:00", rate: 68 },
    { time: "22:00", rate: 64 },
    { time: "23:00", rate: 60 }
  ];
  
  // Sleep data (last night)
  const sleepData = [
    { stage: "Deep", hours: 2.3, color: "#0284c7" },
    { stage: "Light", hours: 4.2, color: "#60a5fa" },
    { stage: "REM", hours: 1.5, color: "#93c5fd" },
    { stage: "Awake", hours: 0.7, color: "#e5e7eb" }
  ];
  
  const availableDevices = [
    {
      id: 101,
      name: "Garmin Forerunner 255",
      type: "sport-watch",
      icon: <Watch className="h-6 w-6 text-gray-800" />
    },
    {
      id: 102,
      name: "Withings Sleep Analyzer",
      type: "sleep-tracker",
      icon: <Moon className="h-6 w-6 text-gray-800" />
    },
    {
      id: 103,
      name: "Samsung Galaxy Watch 5",
      type: "smartwatch",
      icon: <Watch className="h-6 w-6 text-gray-800" />
    }
  ];
  
  const toggleDeviceConnection = (id: number) => {
    setDevices(devices.map(device => 
      device.id === id 
        ? { ...device, isConnected: !device.isConnected } 
        : device
    ));
    
    const device = devices.find(d => d.id === id);
    if (device) {
      toast.success(device.isConnected 
        ? `Disconnected from ${device.name}` 
        : `Connected to ${device.name}`
      );
    }
  };
  
  const syncDevice = (id: number) => {
    toast.success("Syncing data from your device...");
    
    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === id 
          ? { ...device, lastSync: "Just now" } 
          : device
      ));
      
      toast.success("Device data synced successfully!");
    }, 2000);
  };
  
  const addNewDevice = (deviceId: number) => {
    const newDevice = availableDevices.find(d => d.id === deviceId);
    
    if (newDevice) {
      const deviceToAdd: Device = {
        id: devices.length + 1,
        name: newDevice.name,
        type: newDevice.type,
        icon: newDevice.icon,
        isConnected: true,
        batteryLevel: 100,
        lastSync: "Just now"
      };
      
      setDevices([...devices, deviceToAdd]);
      setShowAvailableDevices(false);
      toast.success(`${newDevice.name} added successfully!`);
    }
  };
  
  // Calculate daily averages
  const averageHeartRate = Math.round(
    weeklyData.reduce((sum, day) => sum + day.heartRate, 0) / weeklyData.length
  );
  
  const averageSteps = Math.round(
    weeklyData.reduce((sum, day) => sum + day.steps, 0) / weeklyData.length
  );
  
  const totalSleepHours = sleepData.reduce((sum, stage) => sum + stage.hours, 0);
  
  const latestData = weeklyData[weeklyData.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Wearable Device Integration</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect and sync your wearable devices to track your health metrics in one place.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Connected Devices</h2>
              <Button onClick={() => setShowAvailableDevices(!showAvailableDevices)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </div>
            
            {showAvailableDevices && (
              <Card className="mb-6 border-dashed border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Available Devices</CardTitle>
                  <CardDescription>Select a device to connect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {availableDevices.map((device) => (
                      <Card key={device.id} className="bg-gray-50">
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            {device.icon}
                            <div className="ml-3">
                              <h3 className="font-medium">{device.name}</h3>
                              <p className="text-xs text-muted-foreground capitalize">{device.type.replace('-', ' ')}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => addNewDevice(device.id)}
                          >
                            Connect
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => (
                <Card key={device.id} className={device.isConnected ? "border-primary/20" : ""}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-full ${device.isConnected ? 'bg-primary/10' : 'bg-gray-100'}`}>
                          {device.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{device.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{device.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      
                      <div className={`w-3 h-3 rounded-full ${
                        device.isConnected 
                          ? 'bg-green-500' 
                          : 'bg-gray-300'
                      }`} />
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Battery className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Battery</span>
                        </div>
                        <div className="text-sm font-medium">{device.batteryLevel}%</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <RotateCw className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Last Sync</span>
                        </div>
                        <div className="text-sm">{device.lastSync}</div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center gap-2">
                      <Button 
                        variant={device.isConnected ? "outline" : "default"}
                        className="flex-1"
                        onClick={() => toggleDeviceConnection(device.id)}
                      >
                        {device.isConnected ? "Disconnect" : "Connect"}
                      </Button>
                      
                      <Button 
                        onClick={() => syncDevice(device.id)} 
                        disabled={!device.isConnected}
                        variant="outline"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {devices.length === 0 && (
                <Card className="col-span-3 border-dashed border-2">
                  <CardContent className="p-12 text-center">
                    <Smartphone className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No devices connected</h3>
                    <p className="text-muted-foreground mb-6">
                      Connect your wearable devices to track your health metrics in one place.
                    </p>
                    <Button onClick={() => setShowAvailableDevices(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Device
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          {devices.some(device => device.isConnected) && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-muted-foreground">Heart Rate</h3>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="text-3xl font-bold">{averageHeartRate}</div>
                    <p className="text-sm text-muted-foreground">bpm (avg)</p>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <span>Healthy range</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-muted-foreground">Steps</h3>
                      <Footprints className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold">{latestData.steps.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">today</p>
                    <div className="text-xs text-blue-600 mt-2 flex items-center">
                      <span>Goal: 10,000 steps</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-muted-foreground">Sleep</h3>
                      <Moon className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold">{totalSleepHours.toFixed(1)}</div>
                    <p className="text-sm text-muted-foreground">hours last night</p>
                    <div className="text-xs text-amber-600 mt-2 flex items-center">
                      <span>Below target (8 hours)</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-muted-foreground">Activity</h3>
                      <Activity className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold">{latestData.activityMinutes}</div>
                    <p className="text-sm text-muted-foreground">active minutes</p>
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <span>Goal: 30 min/day</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Heart Rate Trends</CardTitle>
                    <CardDescription>24-hour heart rate monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={heartRateData}>
                          <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis domain={[40, 120]} />
                          <Tooltip />
                          <Area 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#f43f5e" 
                            fillOpacity={1} 
                            fill="url(#colorRate)" 
                            name="Heart Rate (bpm)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sleep Analysis</CardTitle>
                    <CardDescription>Last night's sleep stages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={sleepData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="stage" />
                          <Tooltip formatter={(value) => [`${value} hours`, 'Duration']} />
                          <Legend />
                          <Bar dataKey="hours" fill="#8884d8" name="Hours">
                            {sleepData.map((entry, index) => (
                              <rect key={`rect-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sleep Quality</span>
                        <span className="text-sm font-medium">Good</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sleep Score</span>
                        <span className="text-sm font-medium">78/100</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Bedtime</span>
                        <span className="text-sm font-medium">11:45 PM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Wake Up</span>
                        <span className="text-sm font-medium">7:15 AM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity Overview</CardTitle>
                    <CardDescription>Steps, calories, and distance trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="steps">
                      <TabsList className="mb-4">
                        <TabsTrigger value="steps">Steps</TabsTrigger>
                        <TabsTrigger value="calories">Calories</TabsTrigger>
                        <TabsTrigger value="distance">Distance</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="steps">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value.toLocaleString()} steps`, 'Steps']} />
                              <Bar dataKey="steps" fill="#3b82f6" name="Steps" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between px-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Daily Average</div>
                            <div className="font-medium">{averageSteps.toLocaleString()} steps</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Weekly Total</div>
                            <div className="font-medium">
                              {weeklyData.reduce((sum, day) => sum + day.steps, 0).toLocaleString()} steps
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="calories">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value} calories`, 'Burned']} />
                              <Bar dataKey="calories" fill="#ef4444" name="Calories" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between px-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Daily Average</div>
                            <div className="font-medium">
                              {Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length)} cal
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Weekly Total</div>
                            <div className="font-medium">
                              {weeklyData.reduce((sum, day) => sum + day.calories, 0).toLocaleString()} cal
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="distance">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip formatter={(value) => [`${value} km`, 'Distance']} />
                              <Bar dataKey="distance" fill="#84cc16" name="Distance (km)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between px-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Daily Average</div>
                            <div className="font-medium">
                              {(weeklyData.reduce((sum, day) => sum + day.distance, 0) / weeklyData.length).toFixed(1)} km
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Weekly Total</div>
                            <div className="font-medium">
                              {weeklyData.reduce((sum, day) => sum + day.distance, 0).toFixed(1)} km
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Health Insights</CardTitle>
                    <CardDescription>Personalized metrics based on your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-green-100">
                          <Gauge className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Stress Level</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your heart rate variability indicates low stress levels over the past week.
                          </p>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>Low</span>
                            <span>Medium</span>
                            <span>High</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-blue-100">
                          <LineChart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Fitness Trend</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your cardio fitness score is improving based on your recent activities.
                          </p>
                          <div className="mt-2 flex items-center">
                            <span className="text-sm text-green-600 font-medium">+5% </span>
                            <span className="text-xs text-muted-foreground ml-1">from last month</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-amber-100">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Sleep Pattern</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your sleep schedule has been consistent, but deep sleep is below target.
                          </p>
                          <div className="grid grid-cols-7 gap-1 mt-2">
                            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                              <div key={day} className="flex flex-col items-center">
                                <div className="text-xs text-muted-foreground mb-1">
                                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}
                                </div>
                                <div 
                                  className="h-12 w-4 rounded-sm"
                                  style={{
                                    background: `linear-gradient(to top, 
                                      ${day === 3 || day === 6 ? '#0284c7' : '#3b82f6'} 30%, 
                                      ${day === 3 || day === 6 ? '#60a5fa' : '#93c5fd'} 30% 75%, 
                                      ${day === 3 || day === 6 ? '#93c5fd' : '#bfdbfe'} 75%)`
                                  }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-purple-100">
                          <Activity className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Activity Recommendation</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Based on your current metrics, we recommend increasing moderate cardio activity.
                          </p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">View Personalized Plan</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default WearableIntegration;
