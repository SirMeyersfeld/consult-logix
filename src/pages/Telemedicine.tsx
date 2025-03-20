
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, Clock, Video, Phone, MessageSquare, User, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Telemedicine = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      nextAvailable: "Today, 3:00 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 2,
      name: "Dr. Michael Lee",
      specialty: "Family Medicine",
      rating: 4.7,
      nextAvailable: "Tomorrow, 10:30 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 3,
      name: "Dr. Emily Wong",
      specialty: "Dermatology",
      rating: 4.8,
      nextAvailable: "Today, 5:15 PM",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 4,
      name: "Dr. Robert Chen",
      specialty: "Neurology",
      rating: 4.6,
      nextAvailable: "Friday, 1:00 PM",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150"
    }
  ];
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleBookAppointment = (doctorId: number, doctorName: string) => {
    toast.success(`Appointment request sent to ${doctorName}`);
    navigate('/appointments');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Telemedicine</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect with healthcare providers from the comfort of your home
            </p>
          </div>
        </AnimatedTransition>
        
        <Tabs defaultValue="doctors" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="mt-0">
            <AnimatedTransition type="fadeInUp" delay={0.1}>
              <div className="relative mb-8 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by doctor name or specialty..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-amber-500">{doctor.rating}</span>
                          <div className="flex ml-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.floor(doctor.rating) ? "text-amber-500" : "text-gray-300"}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Next Available:</span>
                        <span className="ml-1 font-medium text-foreground">{doctor.nextAvailable}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 justify-center"
                        onClick={() => toast.success(`Starting video call with ${doctor.name}`)}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 justify-center"
                        onClick={() => toast.success(`Starting voice call with ${doctor.name}`)}
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Voice
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 justify-center"
                        onClick={() => toast.success(`Chat started with ${doctor.name}`)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                    
                    <Button 
                      className="mt-3 w-full"
                      onClick={() => handleBookAppointment(doctor.id, doctor.name)}
                    >
                      Book Appointment
                    </Button>
                  </Card>
                ))}
              </div>
              
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Doctors Found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search criteria.</p>
                  <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
              )}
            </AnimatedTransition>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Sessions</h3>
              <p className="text-muted-foreground mb-4">You don't have any upcoming telemedicine sessions scheduled.</p>
              <Button onClick={() => document.querySelector('[value="doctors"]')?.click()}>Find a Doctor</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Past Sessions</h3>
              <p className="text-muted-foreground mb-4">You haven't had any telemedicine sessions yet.</p>
              <Button onClick={() => document.querySelector('[value="doctors"]')?.click()}>Find a Doctor</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Telemedicine;
