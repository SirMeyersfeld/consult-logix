
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const Appointments = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Sample data
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", available: true },
    { id: 2, name: "Dr. Michael Lee", specialty: "Dermatologist", available: true },
    { id: 3, name: "Dr. Emily Wong", specialty: "General Practitioner", available: false },
    { id: 4, name: "Dr. Robert Chen", specialty: "Neurologist", available: true },
    { id: 5, name: "Dr. Lisa Williams", specialty: "Pediatrician", available: true }
  ];
  
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "2024-05-15", time: "10:00 AM", reason: "Annual heart checkup" },
    { id: 2, doctor: "Dr. Michael Lee", specialty: "Dermatologist", date: "2024-05-20", time: "2:30 PM", reason: "Skin rash follow-up" }
  ]);

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      toast.error('Please sign in to manage appointments');
      navigate('/sign-in');
    }
  }, [navigate]);

  // Get days for calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Create array for days
    const days = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getTimeSlots = () => {
    // Generate time slots from 9 AM to 5 PM
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push(time);
    }
    return slots;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleDoctorSelect = (doctorName) => {
    setSelectedDoctor(doctorName);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    toast.success('Appointment cancelled successfully');
  };

  const bookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !appointmentReason) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Format date
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    // Create new appointment
    const newAppointment = {
      id: appointments.length + 1,
      doctor: selectedDoctor,
      specialty: doctors.find(doc => doc.name === selectedDoctor)?.specialty || '',
      date: formattedDate,
      time: selectedTime,
      reason: appointmentReason
    };
    
    setAppointments([...appointments, newAppointment]);
    toast.success('Appointment booked successfully');
    
    // Reset form
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDoctor('');
    setAppointmentReason('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Appointments</h1>
            <p className="text-muted-foreground max-w-2xl">
              Schedule and manage your medical appointments
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-1">
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="p-4 border-border/50 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>
                              {new Date(appointment.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-sm font-medium">Reason:</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming appointments</p>
                  </div>
                )}
                
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full mt-4 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Book New Appointment
                </Button>
              </div>
            </Card>
          </AnimatedTransition>
          
          {/* Appointment Booking */}
          <AnimatedTransition type="fadeInUp" delay={0.2} className="lg:col-span-2">
            {showForm ? (
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Book an Appointment</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowForm(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Calendar */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Select Date</h3>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          
                          <h3 className="font-medium">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h3>
                          
                          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-xs font-medium text-muted-foreground">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysArray().map((day, index) => (
                            <div key={index} className="aspect-square">
                              {day && (
                                <button
                                  className={`w-full h-full flex items-center justify-center text-sm rounded-full 
                                    ${day < new Date().setHours(0, 0, 0, 0) ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 
                                    selectedDate && day.toDateString() === selectedDate.toDateString() ? 'bg-primary text-white' : 
                                    'hover:bg-primary/10'}`}
                                  disabled={day < new Date().setHours(0, 0, 0, 0)}
                                  onClick={() => day >= new Date().setHours(0, 0, 0, 0) && handleDateClick(day)}
                                >
                                  {day.getDate()}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <>
                        {/* Time Slots */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Select Time</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {getTimeSlots().map((time) => (
                              <button
                                key={time}
                                className={`p-2 text-center text-sm rounded-md border 
                                  ${selectedTime === time ? 'bg-primary text-white border-primary' : 'border-border hover:border-primary/50'}`}
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Select Doctor */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Select Doctor</h3>
                          <div className="space-y-2">
                            {doctors.map((doctor) => (
                              <button
                                key={doctor.id}
                                className={`w-full p-3 text-left rounded-md border ${!doctor.available ? 'opacity-50 cursor-not-allowed' : 
                                  selectedDoctor === doctor.name ? 'bg-primary/10 border-primary' : 'border-border hover:border-primary/50'}`}
                                onClick={() => doctor.available && handleDoctorSelect(doctor.name)}
                                disabled={!doctor.available}
                              >
                                <div className="flex justify-between">
                                  <div>
                                    <p className="font-medium">{doctor.name}</p>
                                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                  </div>
                                  {!doctor.available && (
                                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                      Unavailable
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Appointment Reason */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Reason for Visit</h3>
                          <textarea
                            className="w-full p-3 border border-border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Please describe the reason for your visit..."
                            value={appointmentReason}
                            onChange={(e) => setAppointmentReason(e.target.value)}
                          />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setShowForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={bookAppointment}
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-border/50 shadow-sm overflow-hidden h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Need to schedule a visit?</h2>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Click the button below to start booking your appointment with one of our specialists.
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Book New Appointment
                  </Button>
                </div>
              </Card>
            )}
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
