
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format, addMonths, addYears, isBefore, parseISO, differenceInDays } from 'date-fns';
import { toast } from 'sonner';
import { Calendar, Bell, AlertCircle, Plus, Check, X, Clock, Calendar as CalendarIcon, Mail, BellRing, Phone } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const formSchema = z.object({
  checkupType: z.string(),
  dueDate: z.string(),
  doctor: z.string().min(2, { message: "Doctor name is required" }),
  notes: z.string().optional(),
  reminderDays: z.string(),
  notificationType: z.string(),
  recurring: z.boolean().default(false),
  frequencyValue: z.string().optional(),
  frequencyUnit: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const HealthCheckupReminders = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkupType: 'annual',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      doctor: '',
      notes: '',
      reminderDays: '7',
      notificationType: 'email',
      recurring: true,
      frequencyValue: '12',
      frequencyUnit: 'months',
    },
  });
  
  const watchRecurring = form.watch('recurring');

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      toast.error('Please sign in to access health checkup reminders');
      navigate('/sign-in');
      return;
    }
    
    // Load sample data
    const today = new Date();
    const sampleReminders = [
      {
        id: '1',
        checkupType: 'annual',
        displayName: 'Annual Physical',
        dueDate: format(addMonths(today, 1), 'yyyy-MM-dd'),
        doctor: 'Dr. Sarah Johnson',
        notes: 'Fasting required for blood work',
        reminderDays: '7',
        notificationType: 'email',
        recurring: true,
        frequencyValue: '12',
        frequencyUnit: 'months',
        status: 'upcoming'
      },
      {
        id: '2',
        checkupType: 'dental',
        displayName: 'Dental Cleaning',
        dueDate: format(addMonths(today, -1), 'yyyy-MM-dd'),
        doctor: 'Dr. Michael Chen',
        notes: 'X-rays needed',
        reminderDays: '3',
        notificationType: 'sms',
        recurring: true,
        frequencyValue: '6',
        frequencyUnit: 'months',
        status: 'overdue'
      },
      {
        id: '3',
        checkupType: 'vision',
        displayName: 'Eye Examination',
        dueDate: format(addMonths(today, 3), 'yyyy-MM-dd'),
        doctor: 'Dr. Emily Rodriguez',
        notes: 'Bring current glasses',
        reminderDays: '5',
        notificationType: 'email',
        recurring: true,
        frequencyValue: '12',
        frequencyUnit: 'months',
        status: 'upcoming'
      },
      {
        id: '4',
        checkupType: 'specialist',
        displayName: 'Dermatologist',
        dueDate: format(addMonths(today, 0), 'yyyy-MM-dd'),
        doctor: 'Dr. Robert Taylor',
        notes: 'Annual skin cancer screening',
        reminderDays: '2',
        notificationType: 'push',
        recurring: true,
        frequencyValue: '12',
        frequencyUnit: 'months',
        status: 'today'
      },
      {
        id: '5',
        checkupType: 'vaccination',
        displayName: 'Flu Shot',
        dueDate: format(addMonths(today, 5), 'yyyy-MM-dd'),
        doctor: 'Community Pharmacy',
        notes: 'No appointment necessary',
        reminderDays: '14',
        notificationType: 'email',
        recurring: true,
        frequencyValue: '12',
        frequencyUnit: 'months',
        status: 'upcoming'
      },
      {
        id: '6',
        checkupType: 'lab',
        displayName: 'Blood Work',
        dueDate: format(addMonths(today, -2), 'yyyy-MM-dd'),
        doctor: 'LabCorp',
        notes: 'Fasting required, bring doctor order',
        reminderDays: '1',
        notificationType: 'email',
        recurring: false,
        status: 'overdue'
      }
    ];
    
    setReminders(sampleReminders);
  }, [navigate]);

  const onSubmit = (data: FormValues) => {
    const checkupTypeMap = {
      'annual': 'Annual Physical',
      'dental': 'Dental Cleaning',
      'vision': 'Eye Examination',
      'specialist': 'Specialist Visit',
      'vaccination': 'Vaccination',
      'lab': 'Laboratory Tests',
      'screening': 'Health Screening',
      'other': 'Other Checkup'
    };
    
    const today = new Date();
    const dueDate = parseISO(data.dueDate);
    
    let status = 'upcoming';
    if (isBefore(dueDate, today) && !isSameDay(dueDate, today)) {
      status = 'overdue';
    } else if (isSameDay(dueDate, today)) {
      status = 'today';
    }
    
    const newReminder = {
      id: Math.random().toString(36).substr(2, 9),
      checkupType: data.checkupType,
      displayName: checkupTypeMap[data.checkupType] || 'Other Checkup',
      dueDate: data.dueDate,
      doctor: data.doctor,
      notes: data.notes,
      reminderDays: data.reminderDays,
      notificationType: data.notificationType,
      recurring: data.recurring,
      frequencyValue: data.frequencyValue,
      frequencyUnit: data.frequencyUnit,
      status
    };
    
    setReminders(prev => [newReminder, ...prev]);
    form.reset();
    toast.success('Health checkup reminder added successfully!');
  };
  
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  const handleMarkComplete = (id) => {
    setReminders(prev => prev.map(reminder => {
      if (reminder.id === id) {
        const nextDueDate = calculateNextDueDate(reminder);
        
        if (reminder.recurring) {
          return {
            ...reminder,
            dueDate: nextDueDate,
            status: 'upcoming'
          };
        } else {
          return {
            ...reminder,
            status: 'completed'
          };
        }
      }
      return reminder;
    }));
    
    toast.success('Checkup marked as complete');
  };
  
  const calculateNextDueDate = (reminder) => {
    const currentDueDate = parseISO(reminder.dueDate);
    
    if (!reminder.recurring || !reminder.frequencyValue || !reminder.frequencyUnit) {
      return reminder.dueDate;
    }
    
    const value = parseInt(reminder.frequencyValue);
    
    if (reminder.frequencyUnit === 'months') {
      return format(addMonths(currentDueDate, value), 'yyyy-MM-dd');
    } else if (reminder.frequencyUnit === 'years') {
      return format(addYears(currentDueDate, value), 'yyyy-MM-dd');
    }
    
    return reminder.dueDate;
  };

  const handleDeleteReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
    toast.success('Reminder deleted');
  };
  
  const openReminderDetails = (reminder) => {
    setSelectedReminder(reminder);
    setIsDialogOpen(true);
  };

  const filteredReminders = reminders.filter(reminder => {
    if (filterStatus === 'all') return true;
    return reminder.status === filterStatus;
  });
  
  const countByStatus = {
    all: reminders.length,
    upcoming: reminders.filter(r => r.status === 'upcoming').length,
    today: reminders.filter(r => r.status === 'today').length,
    overdue: reminders.filter(r => r.status === 'overdue').length,
    completed: reminders.filter(r => r.status === 'completed').length,
  };
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'upcoming':
        return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' };
      case 'today':
        return { label: 'Today', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' };
      case 'overdue':
        return { label: 'Overdue', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' };
      case 'completed':
        return { label: 'Completed', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-700' };
    }
  };
  
  const getIconForType = (type) => {
    switch(type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      case 'push':
        return <BellRing className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = parseISO(dueDate);
    const days = differenceInDays(due, today);
    
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    } else if (days === 0) {
      return 'Due today';
    } else {
      return `${days} days until due`;
    }
  };

  const checkupTypeOptions = [
    { value: 'annual', label: 'Annual Physical' },
    { value: 'dental', label: 'Dental Checkup' },
    { value: 'vision', label: 'Eye Examination' },
    { value: 'specialist', label: 'Specialist Visit' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'lab', label: 'Laboratory Tests' },
    { value: 'screening', label: 'Health Screening' },
    { value: 'other', label: 'Other' }
  ];

  const notificationOptions = [
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS/Text' },
    { value: 'push', label: 'Push Notification' }
  ];

  const frequencyUnitOptions = [
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];

  const reminderDaysOptions = [
    { value: '1', label: '1 day before' },
    { value: '2', label: '2 days before' },
    { value: '3', label: '3 days before' },
    { value: '5', label: '5 days before' },
    { value: '7', label: '1 week before' },
    { value: '14', label: '2 weeks before' },
    { value: '30', label: '1 month before' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Health Checkup Reminders</h1>
            <p className="text-muted-foreground mt-2">
              Never miss an important health appointment with personalized reminders
            </p>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6 justify-start">
            <TabsTrigger value="upcoming" onClick={() => setFilterStatus('upcoming')}>
              Upcoming ({countByStatus.upcoming})
            </TabsTrigger>
            <TabsTrigger value="today" onClick={() => setFilterStatus('today')}>
              Today ({countByStatus.today})
            </TabsTrigger>
            <TabsTrigger value="overdue" onClick={() => setFilterStatus('overdue')}>
              Overdue ({countByStatus.overdue})
            </TabsTrigger>
            <TabsTrigger value="all" onClick={() => setFilterStatus('all')}>
              All Reminders ({countByStatus.all})
            </TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <RemindersList 
              reminders={filteredReminders} 
              onMarkComplete={handleMarkComplete}
              onDelete={handleDeleteReminder}
              onViewDetails={openReminderDetails}
              getStatusLabel={getStatusLabel}
              getIconForType={getIconForType}
              getDaysUntilDue={getDaysUntilDue}
            />
          </TabsContent>
          
          <TabsContent value="today" className="space-y-6">
            <RemindersList 
              reminders={filteredReminders} 
              onMarkComplete={handleMarkComplete}
              onDelete={handleDeleteReminder}
              onViewDetails={openReminderDetails}
              getStatusLabel={getStatusLabel}
              getIconForType={getIconForType}
              getDaysUntilDue={getDaysUntilDue}
            />
          </TabsContent>
          
          <TabsContent value="overdue" className="space-y-6">
            <RemindersList 
              reminders={filteredReminders} 
              onMarkComplete={handleMarkComplete}
              onDelete={handleDeleteReminder}
              onViewDetails={openReminderDetails}
              getStatusLabel={getStatusLabel}
              getIconForType={getIconForType}
              getDaysUntilDue={getDaysUntilDue}
            />
          </TabsContent>
          
          <TabsContent value="all" className="space-y-6">
            <RemindersList 
              reminders={filteredReminders} 
              onMarkComplete={handleMarkComplete}
              onDelete={handleDeleteReminder}
              onViewDetails={openReminderDetails}
              getStatusLabel={getStatusLabel}
              getIconForType={getIconForType}
              getDaysUntilDue={getDaysUntilDue}
            />
          </TabsContent>
          
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Health Checkup Reminder</CardTitle>
                <CardDescription>
                  Set up personalized reminders for your upcoming health checkups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="checkupType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Checkup Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a checkup type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {checkupTypeOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Due Date</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Input type="date" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="doctor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Doctor/Provider</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter provider name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reminderDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Remind Me</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select when to be reminded" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {reminderDaysOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="notificationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notification Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select notification type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {notificationOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="recurring"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Recurring Checkup</FormLabel>
                              <FormDescription>
                                Automatically schedule the next checkup after completion
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {watchRecurring && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="frequencyValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Frequency</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  max="60" 
                                  placeholder="Frequency value" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="frequencyUnit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {frequencyUnitOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Input placeholder="Any special instructions or notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">
                      <Plus className="mr-2 h-4 w-4" /> Add Reminder
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {selectedReminder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedReminder.displayName}</DialogTitle>
              <DialogDescription>
                {selectedReminder.doctor}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusLabel(selectedReminder.status).color}>
                  {getStatusLabel(selectedReminder.status).label}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Due Date</span>
                <span className="font-medium">
                  {format(parseISO(selectedReminder.dueDate), 'MMMM d, yyyy')}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remind</span>
                <span className="font-medium flex items-center">
                  {getIconForType(selectedReminder.notificationType)}
                  <span className="ml-2">
                    {reminderDaysOptions.find(o => o.value === selectedReminder.reminderDays)?.label || 
                     `${selectedReminder.reminderDays} days before`}
                  </span>
                </span>
              </div>
              
              {selectedReminder.recurring && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recurring</span>
                  <span className="font-medium">
                    Every {selectedReminder.frequencyValue} {selectedReminder.frequencyUnit}
                  </span>
                </div>
              )}
              
              {selectedReminder.notes && (
                <div className="pt-2">
                  <span className="text-sm text-muted-foreground">Notes</span>
                  <p className="mt-1 p-2 bg-muted/50 rounded">{selectedReminder.notes}</p>
                </div>
              )}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleDeleteReminder(selectedReminder.id)}
                className="sm:w-auto w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Reminder
              </Button>
              
              <Button
                onClick={() => {
                  handleMarkComplete(selectedReminder.id);
                  setIsDialogOpen(false);
                }}
                className="sm:w-auto w-full"
                variant={selectedReminder.status === 'completed' ? 'outline' : 'default'}
              >
                <Check className="h-4 w-4 mr-2" />
                {selectedReminder.status === 'completed' 
                  ? 'Marked Complete' 
                  : 'Mark as Complete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Helper component to display the list of reminders
const RemindersList = ({ 
  reminders, 
  onMarkComplete, 
  onDelete, 
  onViewDetails,
  getStatusLabel,
  getIconForType,
  getDaysUntilDue
}) => {
  if (reminders.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No reminders found</h3>
            <p className="text-muted-foreground mt-1 max-w-md mx-auto">
              You don't have any reminders in this category. Click "Add New" to create a health checkup reminder.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reminders.map((reminder) => (
        <Card key={reminder.id} className="overflow-hidden">
          <div 
            className={`h-2 ${getStatusLabel(reminder.status).color.replace('bg-', 'bg-opacity-70 bg-')}`}
          />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{reminder.displayName}</CardTitle>
                <CardDescription>{reminder.doctor}</CardDescription>
              </div>
              <Badge className={getStatusLabel(reminder.status).color}>
                {getStatusLabel(reminder.status).label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(parseISO(reminder.dueDate), 'MMMM d, yyyy')}</span>
                </div>
                <div className="text-sm font-medium">
                  {reminder.status !== 'completed' && getDaysUntilDue(reminder.dueDate)}
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  Reminder: {reminder.reminderDays} days before
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <div className="h-4 w-4 mr-2 text-muted-foreground">
                  {getIconForType(reminder.notificationType)}
                </div>
                <span className="capitalize">
                  {reminder.notificationType} notification
                </span>
              </div>
              
              {reminder.recurring && (
                <div className="flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    Repeats every {reminder.frequencyValue} {reminder.frequencyUnit}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(reminder.id)}
            >
              <Trash2 className="h-4 w-4 mr-2 text-destructive" />
              Delete
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(reminder)}
              >
                Details
              </Button>
              
              {reminder.status !== 'completed' && (
                <Button
                  size="sm"
                  onClick={() => onMarkComplete(reminder.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Complete
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HealthCheckupReminders;
