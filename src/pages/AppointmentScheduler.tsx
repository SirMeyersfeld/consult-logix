
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  CalendarClock, 
  CalendarDays, 
  Clock, 
  FileText, 
  MapPin, 
  User2, 
  Video, 
  Phone, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  X, 
  AlertTriangle, 
  Search
} from "lucide-react";
import { format } from "date-fns";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  availableDates: Date[];
}

interface TimeSlot {
  id: number;
  time: string;
  isAvailable: boolean;
}

interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  date: Date;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
  location?: string;
}

const AppointmentScheduler = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'video' | 'phone'>('in-person');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');
  
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=48&auto=format&fit=crop",
      rating: 4.8,
      availableDates: [
        new Date(2023, 4, 20),
        new Date(2023, 4, 21),
        new Date(2023, 4, 22),
        new Date(2023, 4, 25),
        new Date(2023, 4, 26)
      ]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Family Medicine",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=48&auto=format&fit=crop",
      rating: 4.9,
      availableDates: [
        new Date(2023, 4, 19),
        new Date(2023, 4, 20),
        new Date(2023, 4, 23),
        new Date(2023, 4, 24),
        new Date(2023, 4, 25)
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=48&auto=format&fit=crop",
      rating: 4.7,
      availableDates: [
        new Date(2023, 4, 19),
        new Date(2023, 4, 21),
        new Date(2023, 4, 22),
        new Date(2023, 4, 23),
        new Date(2023, 4, 26)
      ]
    },
    {
      id: 4,
      name: "Dr. David Thompson",
      specialty: "Dermatology",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=48&auto=format&fit=crop",
      rating: 4.6,
      availableDates: [
        new Date(2023, 4, 19),
        new Date(2023, 4, 20),
        new Date(2023, 4, 24),
        new Date(2023, 4, 25),
        new Date(2023, 4, 26)
      ]
    }
  ];
  
  const timeSlots: TimeSlot[] = [
    { id: 1, time: "9:00 AM", isAvailable: true },
    { id: 2, time: "10:00 AM", isAvailable: true },
    { id: 3, time: "11:00 AM", isAvailable: false },
    { id: 4, time: "1:00 PM", isAvailable: true },
    { id: 5, time: "2:00 PM", isAvailable: true },
    { id: 6, time: "3:00 PM", isAvailable: false },
    { id: 7, time: "4:00 PM", isAvailable: true }
  ];
  
  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Cardiology",
      date: new Date(2023, 4, 25),
      time: "10:00 AM",
      type: 'in-person',
      status: 'upcoming',
      location: "Medical Center Main Building, Suite 302"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Family Medicine",
      date: new Date(2023, 5, 5),
      time: "2:00 PM",
      type: 'video',
      status: 'upcoming'
    }
  ];
  
  const pastAppointments: Appointment[] = [
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Pediatrics",
      date: new Date(2023, 3, 15),
      time: "9:00 AM",
      type: 'in-person',
      status: 'completed',
      location: "Children's Health Clinic, Room 105"
    },
    {
      id: 4,
      doctorName: "Dr. David Thompson",
      doctorSpecialty: "Dermatology",
      date: new Date(2023, 3, 2),
      time: "3:00 PM",
      type: 'phone',
      status: 'completed'
    },
    {
      id: 5,
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Family Medicine",
      date: new Date(2023, 2, 20),
      time: "11:00 AM",
      type: 'video',
      status: 'cancelled'
    }
  ];
  
  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };
  
  const handleScheduleAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTimeSlot || !reason) {
      toast.error("Please complete all required fields");
      return;
    }
    
    setShowConfirmation(true);
  };
  
  const handleConfirmAppointment = () => {
    toast.success("Appointment scheduled successfully!");
    setShowConfirmation(false);
    
    // Reset form
    setSelectedDoctor(null);
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    setAppointmentType('in-person');
    setReason('');
    setNotes('');
  };
  
  const filteredDoctors = doctorSearchTerm
    ? doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(doctorSearchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(doctorSearchTerm.toLowerCase())
      )
    : doctors;
  
  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case 'in-person': return <User2 className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <User2 className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'in-person': return 'In-Person Visit';
      case 'video': return 'Video Consultation';
      case 'phone': return 'Phone Consultation';
      default: return 'Appointment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Appointment Scheduler</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Schedule appointments with your healthcare providers quickly and easily.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarClock className="h-5 w-5 mr-2 text-primary" />
                    Schedule New Appointment
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to schedule your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-2 block">1. Select a Doctor</Label>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search by name or specialty..."
                        className="pl-10"
                        value={doctorSearchTerm}
                        onChange={(e) => setDoctorSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredDoctors.map((doctor) => (
                        <div 
                          key={doctor.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors 
                            ${selectedDoctor?.id === doctor.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:border-gray-300'}`}
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          <div className="flex items-center">
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="ml-3">
                              <h3 className="font-medium">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 15.585l6.146 3.233a.75.75 0 001.087-.785l-1.17-6.835 4.976-4.853a.75.75 0 00-.414-1.28l-6.871-1.002L10 .702 7.245 4.063l-6.87 1.002a.75.75 0 00-.415 1.28l4.976 4.853-1.17 6.835a.75.75 0 001.087.785L10 15.585z"
                                      />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs ml-1 text-muted-foreground">
                                  {doctor.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">2. Select Date & Time</Label>
                    
                    {selectedDoctor ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm text-muted-foreground mb-2">Available Dates</h4>
                          <div className="border rounded-md">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={handleDateSelect}
                              disabled={(date) => {
                                // Disable dates that are not in the available dates
                                return !selectedDoctor.availableDates.some(
                                  (availableDate) =>
                                    availableDate.getDate() === date.getDate() &&
                                    availableDate.getMonth() === date.getMonth() &&
                                    availableDate.getFullYear() === date.getFullYear()
                                );
                              }}
                              className="rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm text-muted-foreground mb-2">Available Time Slots</h4>
                          {selectedDate ? (
                            <div className="grid grid-cols-2 gap-2">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot.id}
                                  className={`py-2 px-4 text-sm rounded-md border transition-colors ${
                                    !slot.isAvailable
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : selectedTimeSlot === slot.time
                                      ? 'border-primary bg-primary/10 text-primary'
                                      : 'hover:border-gray-300'
                                  }`}
                                  disabled={!slot.isAvailable}
                                  onClick={() => handleTimeSelect(slot.time)}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="border rounded-md p-4 text-center text-muted-foreground">
                              Please select a date first
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-md p-4 text-center text-muted-foreground">
                        Please select a doctor first
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">3. Appointment Details</Label>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="appointment-type" className="text-sm mb-1 block">
                          Appointment Type
                        </Label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm rounded-md border transition-colors ${
                              appointmentType === 'in-person'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setAppointmentType('in-person')}
                          >
                            <User2 className="h-4 w-4" />
                            In-Person
                          </button>
                          <button
                            type="button"
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm rounded-md border transition-colors ${
                              appointmentType === 'video'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setAppointmentType('video')}
                          >
                            <Video className="h-4 w-4" />
                            Video
                          </button>
                          <button
                            type="button"
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm rounded-md border transition-colors ${
                              appointmentType === 'phone'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setAppointmentType('phone')}
                          >
                            <Phone className="h-4 w-4" />
                            Phone
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="reason" className="text-sm mb-1 block">
                          Reason for Visit <span className="text-red-500">*</span>
                        </Label>
                        <Select onValueChange={setReason} value={reason}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason for visit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="annual-checkup">Annual Checkup</SelectItem>
                            <SelectItem value="illness">Illness or Injury</SelectItem>
                            <SelectItem value="follow-up">Follow-up Appointment</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="procedure">Procedure</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes" className="text-sm mb-1 block">
                          Additional Notes
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Please provide any additional information that might be relevant for your visit"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleScheduleAppointment} 
                    disabled={!selectedDoctor || !selectedDate || !selectedTimeSlot || !reason}
                    className="w-full"
                  >
                    Schedule Appointment
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Your Appointments</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Tabs defaultValue="upcoming">
                    <TabsList className="grid grid-cols-2 mx-6">
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="past">Past</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upcoming" className="pt-4">
                      {upcomingAppointments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No upcoming appointments
                        </div>
                      ) : (
                        <div className="divide-y">
                          {upcomingAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  {getAppointmentTypeIcon(appointment.type)}
                                  <span className="ml-2 font-medium">
                                    {getTypeLabel(appointment.type)}
                                  </span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                              
                              <h3 className="font-medium">{appointment.doctorName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                              
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center text-sm">
                                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{appointment.time}</span>
                                </div>
                                {appointment.location && (
                                  <div className="flex items-start text-sm">
                                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                                    <span>{appointment.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-4 flex gap-2">
                                <Button variant="outline" size="sm" className="w-full">
                                  Reschedule
                                </Button>
                                <Button variant="outline" size="sm" className="w-full">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="past" className="pt-4">
                      {pastAppointments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          No past appointments
                        </div>
                      ) : (
                        <div className="divide-y">
                          {pastAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  {getAppointmentTypeIcon(appointment.type)}
                                  <span className="ml-2 font-medium">
                                    {getTypeLabel(appointment.type)}
                                  </span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
                                  {appointment.status}
                                </span>
                              </div>
                              
                              <h3 className="font-medium">{appointment.doctorName}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctorSpecialty}</p>
                              
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center text-sm">
                                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{format(appointment.date, 'EEEE, MMMM d, yyyy')}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{appointment.time}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex gap-2">
                                {appointment.status === 'completed' && (
                                  <>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <FileText className="h-4 w-4 mr-2" />
                                      View Summary
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full">
                                      <CalendarClock className="h-4 w-4 mr-2" />
                                      Book Again
                                    </Button>
                                  </>
                                )}
                                {appointment.status === 'cancelled' && (
                                  <Button variant="outline" size="sm" className="w-full">
                                    <CalendarClock className="h-4 w-4 mr-2" />
                                    Reschedule
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                    Appointment Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <div className="rounded-full bg-green-100 p-1 h-6 w-6 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm">Arrive 15 minutes early for in-person appointments.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-green-100 p-1 h-6 w-6 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm">Have your insurance card and ID ready.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-green-100 p-1 h-6 w-6 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm">For virtual visits, test your device and connection beforehand.</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="rounded-full bg-amber-100 p-1 h-6 w-6 flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm">Cancellations should be made at least 24 hours in advance.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </AnimatedTransition>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogDescription>
              Please review the details of your appointment before confirming.
            </DialogDescription>
          </DialogHeader>
          
          {selectedDoctor && selectedDate && selectedTimeSlot && (
            <div className="space-y-4 py-4">
              <div className="border rounded-md p-4 bg-primary/5">
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedDoctor.image} 
                    alt={selectedDoctor.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedDoctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{selectedTimeSlot}</span>
                  </div>
                  <div className="flex items-center">
                    {getAppointmentTypeIcon(appointmentType)}
                    <span className="ml-2">{getTypeLabel(appointmentType)}</span>
                  </div>
                  {appointmentType === 'in-person' && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" />
                      <span>Medical Center Main Building, Suite {100 + selectedDoctor.id}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Reason for Visit</h4>
                <p className="text-sm">
                  {reason === 'annual-checkup' && 'Annual Checkup'}
                  {reason === 'illness' && 'Illness or Injury'}
                  {reason === 'follow-up' && 'Follow-up Appointment'}
                  {reason === 'consultation' && 'Consultation'}
                  {reason === 'procedure' && 'Procedure'}
                  {reason === 'other' && 'Other'}
                </p>
              </div>
              
              {notes && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Additional Notes</h4>
                  <p className="text-sm">{notes}</p>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1">
                    <CalendarClock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">Appointment Reminder</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      You will receive a reminder email and text message 24 hours before your appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleConfirmAppointment}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentScheduler;
