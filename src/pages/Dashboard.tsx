
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Activity, FileText, UserPlus, Bell } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your prescription is ready for review", time: "2 hours ago", read: false },
    { id: 2, message: "Dr. Sarah Johnson confirmed your appointment", time: "Yesterday", read: true },
    { id: 3, message: "Your medical records have been updated", time: "2 days ago", read: true }
  ]);

  // Upcoming appointments
  const [appointments] = useState([
    { id: 1, doctor: "Dr. Sarah Johnson", speciality: "Cardiologist", date: "2024-05-15", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Michael Lee", speciality: "Dermatologist", date: "2024-05-18", time: "2:30 PM" }
  ]);

  // Recent activities
  const [activities] = useState([
    { id: 1, type: "Consultation", doctor: "Dr. Sarah Johnson", date: "2024-05-01", description: "Heart checkup" },
    { id: 2, type: "Prescription", doctor: "Dr. Michael Lee", date: "2024-04-28", description: "Skin treatment" },
    { id: 3, type: "Lab Results", doctor: "Dr. Emily Wong", date: "2024-04-20", description: "Blood work" }
  ]);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const name = localStorage.getItem('userName') || 'Guest';
    
    setIsAuthenticated(authStatus);
    setUserName(name);
    
    if (!authStatus) {
      toast.error('Please sign in to access the dashboard');
      navigate('/sign-in');
    }
  }, [navigate]);

  const markAsRead = (id) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast.success('Notification marked as read');
  };

  const scheduleAppointment = () => {
    toast.success('Redirecting to appointment scheduling');
    navigate('/appointments');
  };

  const viewAllActivity = () => {
    toast.success('Redirecting to activity history');
    navigate('/activity');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
              <p className="text-muted-foreground">
                Here's an overview of your health journey
              </p>
            </div>
            
            <div className="flex mt-4 md:mt-0 gap-3">
              <Button 
                onClick={() => navigate('/consultation')}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                New Consultation
              </Button>
              <Button 
                variant="outline" 
                onClick={scheduleAppointment}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 border-border/50 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                      <p className="text-lg font-semibold">{appointments.length} Appointments</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border-border/50 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active</p>
                      <p className="text-lg font-semibold">2 Prescriptions</p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 border-border/50 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 bg-primary/10 rounded-full">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last</p>
                      <p className="text-lg font-semibold">2 Weeks Ago</p>
                    </div>
                  </div>
                </Card>
              </div>
            </AnimatedTransition>
            
            {/* Appointments */}
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                    <Button variant="link" onClick={scheduleAppointment} className="text-primary p-0">
                      View All
                    </Button>
                  </div>
                  
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <Card key={appointment.id} className="p-4 border-border/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <UserPlus className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{appointment.doctor}</p>
                                <p className="text-sm text-muted-foreground">{appointment.speciality}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  {new Date(appointment.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{appointment.time}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming appointments</p>
                      <Button 
                        onClick={scheduleAppointment} 
                        variant="outline" 
                        className="mt-2"
                      >
                        Schedule New Appointment
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </AnimatedTransition>
            
            {/* Recent Activity */}
            <AnimatedTransition type="fadeInUp" delay={0.3}>
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <Button variant="link" onClick={viewAllActivity} className="text-primary p-0">
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <div className="mr-4 mt-1 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <p className="text-sm">{activity.doctor}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedTransition>
          </div>
          
          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Notifications */}
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-3 rounded-lg ${notification.read ? 'bg-background' : 'bg-primary/5 border-l-2 border-primary'}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <Bell className={`h-5 w-5 mt-0.5 mr-2 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                              <div>
                                <p className={`text-sm ${notification.read ? '' : 'font-medium'}`}>{notification.message}</p>
                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                              </div>
                            </div>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                className="h-6 px-2 text-xs hover:bg-primary/10 hover:text-primary"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark read
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No new notifications</p>
                    </div>
                  )}
                </div>
              </Card>
            </AnimatedTransition>
            
            {/* Health Tips */}
            <AnimatedTransition type="fadeInUp" delay={0.3}>
              <Card className="border-border/50 shadow-sm overflow-hidden bg-primary/5">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Health Tips</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Stay Hydrated</h3>
                      <p className="text-sm text-muted-foreground">Drink at least 8 glasses of water daily to maintain optimal health.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Regular Exercise</h3>
                      <p className="text-sm text-muted-foreground">Aim for at least 30 minutes of moderate exercise most days of the week.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="font-medium mb-2">Balanced Diet</h3>
                      <p className="text-sm text-muted-foreground">Include a variety of fruits, vegetables, lean proteins, and whole grains in your diet.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedTransition>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
