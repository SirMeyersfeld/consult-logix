
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, MapPin, Video, Phone, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedTransition from '@/components/AnimatedTransition';

interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  type: 'in-person' | 'video' | 'phone';
}

const UpcomingAppointments = () => {
  const navigate = useNavigate();
  
  const appointments: Appointment[] = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "March 25, 2024",
      time: "10:30 AM",
      location: "Heart Health Clinic",
      type: "in-person"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Lee",
      specialty: "Family Medicine",
      date: "April 2, 2024",
      time: "2:15 PM",
      location: "Virtual Appointment",
      type: "video"
    },
    {
      id: 3,
      doctorName: "Dr. Emily Wong",
      specialty: "Dermatology",
      date: "April 10, 2024",
      time: "9:00 AM",
      location: "Phone Consultation",
      type: "phone"
    }
  ];
  
  const getAppointmentTypeIcon = (type: Appointment['type']) => {
    switch (type) {
      case 'in-person':
        return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-green-500" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-amber-500" />;
    }
  };
  
  const getAppointmentTypeBadge = (type: Appointment['type']) => {
    switch (type) {
      case 'in-person':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">In Person</Badge>;
      case 'video':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Video Call</Badge>;
      case 'phone':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Phone Call</Badge>;
    }
  };

  return (
    <AnimatedTransition type="fadeInUp">
      <Card className="w-full shadow-sm border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">{appointment.doctorName}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    </div>
                    {getAppointmentTypeBadge(appointment.type)}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                      {getAppointmentTypeIcon(appointment.type)}
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-red-200 text-red-500 hover:bg-red-50">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <Calendar className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No upcoming appointments</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <Button
            onClick={() => navigate('/appointments')} 
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-1" />
            Schedule New Appointment
          </Button>
        </CardFooter>
      </Card>
    </AnimatedTransition>
  );
};

export default UpcomingAppointments;
