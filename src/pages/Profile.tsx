
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Shield, Calendar, Activity } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('John Doe');
  const [phone, setPhone] = useState('(123) 456-7890');
  const [address, setAddress] = useState('123 Medical Ave, Health City');
  const [subscriptionType, setSubscriptionType] = useState<'patient' | 'doctor' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    const storedName = localStorage.getItem('userName') || 'John Doe';
    const plan = localStorage.getItem('subscriptionPlan') as 'patient' | 'doctor' | null;
    
    setIsAuthenticated(authStatus);
    setUserEmail(email);
    setName(storedName);
    setSubscriptionType(plan);
    
    if (!authStatus) {
      toast.error('Please sign in to view your profile');
      navigate('/sign-in');
    }
    
    document.title = 'Your Profile - MediLog';
  }, [navigate]);
  
  const handleSaveProfile = () => {
    localStorage.setItem('userName', name);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  
  // Check if the user has a subscription plan
  useEffect(() => {
    if (isAuthenticated && !subscriptionType) {
      toast.info('Please select a subscription plan to access all features', {
        action: {
          label: 'Subscribe',
          onClick: () => navigate('/subscription')
        }
      });
    }
  }, [isAuthenticated, subscriptionType, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Manage your personal information and account settings
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <AnimatedTransition type="fadeInUp" delay={0.1}>
                <Card className="p-6 shadow-md">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-muted-foreground">{userEmail}</p>
                    
                    {subscriptionType && (
                      <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {subscriptionType === 'doctor' ? 'Doctor Plan' : 'Patient Plan'}
                      </div>
                    )}
                    
                    <div className="w-full mt-6 pt-6 border-t border-border">
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => navigate('/subscription')}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        {subscriptionType ? 'Manage Subscription' : 'Choose a Plan'}
                      </Button>
                    </div>
                  </div>
                </Card>
              </AnimatedTransition>
              
              {subscriptionType === 'doctor' && (
                <AnimatedTransition type="fadeInUp" delay={0.2}>
                  <Card className="p-6 shadow-md mt-6">
                    <h3 className="font-semibold mb-4">Doctor Tools</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/consultation')}>
                        <User className="mr-2 h-4 w-4" />
                        New Consultation
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/prescription')}>
                        <Activity className="mr-2 h-4 w-4" />
                        Create Prescription
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/appointments')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Manage Appointments
                      </Button>
                    </div>
                  </Card>
                </AnimatedTransition>
              )}
              
              {subscriptionType === 'patient' && (
                <AnimatedTransition type="fadeInUp" delay={0.2}>
                  <Card className="p-6 shadow-md mt-6">
                    <h3 className="font-semibold mb-4">Quick Access</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/mediport')}>
                        <Activity className="mr-2 h-4 w-4" />
                        View Medical Records
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/appointments')}>
                        <Calendar className="mr-2 h-4 w-4" />
                        My Appointments
                      </Button>
                    </div>
                  </Card>
                </AnimatedTransition>
              )}
            </div>
            
            <div className="lg:col-span-2">
              <AnimatedTransition type="fadeInUp" delay={0.3}>
                <Card className="shadow-md">
                  <Tabs defaultValue="profile" className="w-full">
                    <div className="border-b px-6 py-3">
                      <TabsList className="justify-start">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="profile" className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Personal Information</h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEditing(!isEditing)}
                          >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name</Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary/50">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                </span>
                                <Input
                                  id="fullName"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  readOnly={!isEditing}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary/50">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                </span>
                                <Input
                                  id="email"
                                  type="email"
                                  value={userEmail}
                                  readOnly
                                  className="rounded-l-none bg-muted/50"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary/50">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                </span>
                                <Input
                                  id="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  readOnly={!isEditing}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary/50">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                </span>
                                <Input
                                  id="address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  readOnly={!isEditing}
                                  className="rounded-l-none"
                                />
                              </div>
                            </div>
                          </div>
                          
                          {isEditing && (
                            <div className="flex justify-end">
                              <Button onClick={handleSaveProfile}>
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" placeholder="••••••••" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="notifications" className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                      <p className="text-muted-foreground mb-4">
                        Configure how you receive notifications from MediLog
                      </p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">
                              Receive important updates via email
                            </p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/30 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary">
                            <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 -translate-x-1 translate-x-5"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Appointment Reminders</p>
                            <p className="text-sm text-muted-foreground">
                              Get reminded about upcoming appointments
                            </p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 translate-x-5"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Prescription Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Notifications when prescriptions are updated
                            </p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 translate-x-5"></span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </AnimatedTransition>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Profile;
