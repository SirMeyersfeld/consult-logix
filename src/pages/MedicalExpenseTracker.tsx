
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
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calendar, Trash2, Plus, DollarSign, FileText, Filter, Download } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
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

const formSchema = z.object({
  date: z.string(),
  category: z.string(),
  provider: z.string(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  description: z.string().min(2).max(100),
  paymentMethod: z.string(),
  insuranceCovered: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Insurance covered amount must be a number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9a6fb0', '#61dafb'];

const MedicalExpenseTracker = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [filterYear, setFilterYear] = useState(new Date().getFullYear().toString());
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      category: 'doctor',
      provider: '',
      amount: '',
      description: '',
      paymentMethod: 'credit',
      insuranceCovered: '0',
    },
  });

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      toast.error('Please sign in to access the expense tracker');
      navigate('/sign-in');
      return;
    }
    
    // Load sample data
    const sampleExpenses = [
      {
        id: '1',
        date: '2023-10-15',
        category: 'doctor',
        provider: 'Dr. Smith',
        amount: 150.00,
        description: 'Annual check-up',
        paymentMethod: 'credit',
        insuranceCovered: 100.00,
        outOfPocket: 50.00
      },
      {
        id: '2',
        date: '2023-11-05',
        category: 'prescription',
        provider: 'CVS Pharmacy',
        amount: 75.50,
        description: 'Monthly medication',
        paymentMethod: 'insurance',
        insuranceCovered: 50.00,
        outOfPocket: 25.50
      },
      {
        id: '3',
        date: '2023-12-20',
        category: 'lab',
        provider: 'LabCorp',
        amount: 210.00,
        description: 'Blood work',
        paymentMethod: 'debit',
        insuranceCovered: 180.00,
        outOfPocket: 30.00
      },
      {
        id: '4',
        date: '2024-01-10',
        category: 'specialist',
        provider: 'Dr. Johnson',
        amount: 300.00,
        description: 'Dermatologist consultation',
        paymentMethod: 'credit',
        insuranceCovered: 250.00,
        outOfPocket: 50.00
      },
      {
        id: '5',
        date: '2024-02-03',
        category: 'emergency',
        provider: 'Memorial Hospital',
        amount: 1200.00,
        description: 'ER visit',
        paymentMethod: 'insurance',
        insuranceCovered: 950.00,
        outOfPocket: 250.00
      },
      {
        id: '6',
        date: '2024-03-15',
        category: 'other',
        provider: 'Medical Supply Co.',
        amount: 120.00,
        description: 'Medical equipment',
        paymentMethod: 'debit',
        insuranceCovered: 0,
        outOfPocket: 120.00
      }
    ];
    
    setExpenses(sampleExpenses);
  }, [navigate]);

  const onSubmit = (data: FormValues) => {
    const outOfPocket = Number(data.amount) - Number(data.insuranceCovered);
    
    const newExpense = {
      id: Math.random().toString(36).substr(2, 9),
      date: data.date,
      category: data.category,
      provider: data.provider,
      amount: Number(data.amount),
      description: data.description,
      paymentMethod: data.paymentMethod,
      insuranceCovered: Number(data.insuranceCovered),
      outOfPocket: outOfPocket > 0 ? outOfPocket : 0
    };
    
    setExpenses(prev => [newExpense, ...prev]);
    form.reset();
    toast.success('Expense added successfully!');
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Expense deleted');
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear().toString();
    const expenseMonth = (expenseDate.getMonth() + 1).toString();
    
    const yearMatch = filterYear === 'all' || expenseYear === filterYear;
    const monthMatch = filterMonth === 'all' || expenseMonth === filterMonth;
    const categoryMatch = filterCategory === 'all' || expense.category === filterCategory;
    
    return yearMatch && monthMatch && categoryMatch;
  });

  // Calculate total expenses and amount covered by insurance
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalCovered = filteredExpenses.reduce((sum, expense) => sum + expense.insuranceCovered, 0);
  const totalOutOfPocket = filteredExpenses.reduce((sum, expense) => sum + expense.outOfPocket, 0);

  // Data for pie chart
  const pieData = [
    { name: 'Doctor', value: 0 },
    { name: 'Prescription', value: 0 },
    { name: 'Lab', value: 0 },
    { name: 'Specialist', value: 0 },
    { name: 'Emergency', value: 0 },
    { name: 'Other', value: 0 },
  ];
  
  filteredExpenses.forEach(expense => {
    switch(expense.category) {
      case 'doctor':
        pieData[0].value += expense.amount;
        break;
      case 'prescription':
        pieData[1].value += expense.amount;
        break;
      case 'lab':
        pieData[2].value += expense.amount;
        break;
      case 'specialist':
        pieData[3].value += expense.amount;
        break;
      case 'emergency':
        pieData[4].value += expense.amount;
        break;
      case 'other':
        pieData[5].value += expense.amount;
        break;
      default:
        break;
    }
  });

  // Data for bar chart (monthly expenses)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = months.map(month => ({ 
    name: month, 
    total: 0,
    insurance: 0,
    outOfPocket: 0
  }));
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear().toString();
    
    if (filterYear === 'all' || expenseYear === filterYear) {
      const monthIndex = expenseDate.getMonth();
      monthlyData[monthIndex].total += expense.amount;
      monthlyData[monthIndex].insurance += expense.insuranceCovered;
      monthlyData[monthIndex].outOfPocket += expense.outOfPocket;
    }
  });

  const categoryOptions = [
    { value: 'doctor', label: 'Doctor Visit' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'lab', label: 'Laboratory' },
    { value: 'specialist', label: 'Specialist' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'other', label: 'Other' }
  ];

  const paymentOptions = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'cash', label: 'Cash' },
    { value: 'other', label: 'Other' }
  ];

  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear; i++) {
    yearOptions.push({ value: i.toString(), label: i.toString() });
  }
  
  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 pt-28">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Medical Expense Tracker</h1>
            <p className="text-muted-foreground mt-2">
              Track and analyze your healthcare expenses in one place
            </p>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="mb-6 justify-start">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="add">Add Expense</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Medical Expenses</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Select value={filterYear} onValueChange={setFilterYear}>
                      <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {yearOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterMonth} onValueChange={setFilterMonth}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categoryOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredExpenses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No expenses found</h3>
                    <p className="text-muted-foreground mt-1">
                      Add some expenses or adjust your filters
                    </p>
                    <Button className="mt-4" onClick={() => form.reset()}>
                      <Plus className="mr-2 h-4 w-4" /> Add New Expense
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Date</th>
                          <th className="py-3 px-4 text-left font-medium">Category</th>
                          <th className="py-3 px-4 text-left font-medium">Provider</th>
                          <th className="py-3 px-4 text-left font-medium">Description</th>
                          <th className="py-3 px-4 text-right font-medium">Total</th>
                          <th className="py-3 px-4 text-right font-medium">Insurance</th>
                          <th className="py-3 px-4 text-right font-medium">Out of Pocket</th>
                          <th className="py-3 px-4 text-center font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExpenses.map((expense) => (
                          <tr key={expense.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{format(new Date(expense.date), 'MMM d, yyyy')}</td>
                            <td className="py-3 px-4 capitalize">{expense.category}</td>
                            <td className="py-3 px-4">{expense.provider}</td>
                            <td className="py-3 px-4">{expense.description}</td>
                            <td className="py-3 px-4 text-right">${expense.amount.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right">${expense.insuranceCovered.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right">${expense.outOfPocket.toFixed(2)}</td>
                            <td className="py-3 px-4 text-center">
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteExpense(expense.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Showing {filteredExpenses.length} expenses</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total:</span>{' '}
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Insurance covered:</span>{' '}
                    <span className="font-medium">${totalCovered.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Out of pocket:</span>{' '}
                    <span className="font-medium">${totalOutOfPocket.toFixed(2)}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Medical Expense</CardTitle>
                <CardDescription>
                  Enter the details of your medical expense
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
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
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryOptions.map(option => (
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
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter provider name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount ($)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="0.00" 
                                {...field} 
                                onChange={(e) => {
                                  // Allow only numbers and decimal points
                                  const value = e.target.value.replace(/[^0-9.]/g, '');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="insuranceCovered"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Insurance Covered ($)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="0.00" 
                                {...field} 
                                onChange={(e) => {
                                  // Allow only numbers and decimal points
                                  const value = e.target.value.replace(/[^0-9.]/g, '');
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {paymentOptions.map(option => (
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
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of expense" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full">Add Expense</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Summary</CardTitle>
                  <CardDescription>
                    {filterYear !== 'all' 
                      ? `Expense breakdown for ${filterYear}` 
                      : 'Expense breakdown for all years'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="h-[300px] w-full max-w-[500px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData.filter(item => item.value > 0)}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                  <CardDescription>
                    {filterYear !== 'all' 
                      ? `Monthly expense trend for ${filterYear}` 
                      : 'Monthly expense trend for all years'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                        <Legend />
                        <Bar dataKey="insurance" name="Insurance Covered" stackId="a" fill="#8884d8" />
                        <Bar dataKey="outOfPocket" name="Out of Pocket" stackId="a" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Expense Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col p-4 bg-primary/5 rounded-lg">
                      <div className="text-primary flex items-center mb-2">
                        <DollarSign className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Total Expenses</span>
                      </div>
                      <span className="text-2xl font-bold">${totalAmount.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground mt-1">
                        {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="flex flex-col p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <div className="text-blue-500 flex items-center mb-2">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Avg. Per Month</span>
                      </div>
                      <span className="text-2xl font-bold">
                        ${(totalAmount / (filterMonth === 'all' ? 12 : 1)).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground mt-1">
                        Monthly average
                      </span>
                    </div>
                    
                    <div className="flex flex-col p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                      <div className="text-green-500 flex items-center mb-2">
                        <FileText className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Insurance Covered</span>
                      </div>
                      <span className="text-2xl font-bold">${totalCovered.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground mt-1">
                        {totalAmount > 0 ? ((totalCovered / totalAmount) * 100).toFixed(0) : 0}% of total
                      </span>
                    </div>
                    
                    <div className="flex flex-col p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                      <div className="text-orange-500 flex items-center mb-2">
                        <Trash2 className="h-5 w-5 mr-2" />
                        <span className="font-semibold">Out of Pocket</span>
                      </div>
                      <span className="text-2xl font-bold">${totalOutOfPocket.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground mt-1">
                        {totalAmount > 0 ? ((totalOutOfPocket / totalAmount) * 100).toFixed(0) : 0}% of total
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Export Expense Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MedicalExpenseTracker;
