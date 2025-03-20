
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, Star, MapPin, 
  Phone, Mail, Video, MessageSquare, FileText, UserCheck,
  CheckCircle, XCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<any>(null);

  const mockTimeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  useEffect(() => {
    // Simulate API call to get doctor details
    setTimeout(() => {
      const mockDoctors = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "Cardiology",
          rating: 4.9,
          profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&h=500",
          education: "Stanford University School of Medicine",
          experience: "15 years",
          location: "123 Medical Center Dr, San Francisco, CA",
          phone: "(555) 123-4567",
          email: "dr.johnson@medilog.com",
          about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac rehabilitation.",
          languages: ["English", "Spanish"],
          acceptingNewPatients: true,
          insuranceAccepted: ["Medicare", "Blue Cross", "Cigna", "Aetna"],
          reviews: [
            { id: 1, user: "Michael T.", rating: 5, comment: "Dr. Johnson took the time to explain my condition thoroughly. Very professional and caring.", date: "2024-04-10" },
            { id: 2, user: "Lisa R.", rating: 5, comment: "Excellent doctor who really listens. Highly recommend!", date: "2024-03-22" },
            { id: 3, user: "Robert K.", rating: 4, comment: "Very knowledgeable and helpful with my heart condition.", date: "2024-02-15" }
          ]
        },
        {
          id: 2,
          name: "Dr. Michael Lee",
          specialty: "Family Medicine",
          rating: 4.7,
          profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&h=500",
          education: "UCLA School of Medicine",
          experience: "12 years",
          location: "456 Health Center Blvd, San Francisco, CA",
          phone: "(555) 234-5678",
          email: "dr.lee@medilog.com",
          about: "Dr. Michael Lee is a compassionate family medicine physician dedicated to providing comprehensive care for patients of all ages. He focuses on preventive medicine, chronic disease management, and promoting healthy lifestyles.",
          languages: ["English", "Mandarin"],
          acceptingNewPatients: true,
          insuranceAccepted: ["Medicare", "Blue Shield", "UnitedHealthcare", "Kaiser"],
          reviews: [
            { id: 1, user: "Jennifer L.", rating: 5, comment: "Dr. Lee is wonderful with my entire family. Patient and thorough.", date: "2024-04-05" },
            { id: 2, user: "David P.", rating: 4, comment: "Great doctor who takes time to listen to concerns.", date: "2024-03-10" }
          ]
        },
        {
          id: 3,
          name: "Dr. Emily Wong",
          specialty: "Dermatology",
          rating: 4.8,
          profileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&h=500",
          education: "Johns Hopkins School of Medicine",
          experience: "10 years",
          location: "789 Dermatology Center, San Francisco, CA",
          phone: "(555) 345-6789",
          email: "dr.wong@medilog.com",
          about: "Dr. Emily Wong is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. She is passionate about skin health and helping patients achieve their skin goals.",
          languages: ["English", "Cantonese"],
          acceptingNewPatients: true,
          insuranceAccepted: ["Medicare", "Blue Cross", "Aetna"],
          reviews: [
            { id: 1, user: "Sarah M.", rating: 5, comment: "Dr. Wong helped clear my acne when nothing else worked. Amazing!", date: "2024-04-12" },
            { id: 2, user: "Thomas B.", rating: 5, comment: "Very professional and knowledgeable. Highly recommend.", date: "2024-03-25" }
          ]
        },
        {
          id: 4,
          name: "Dr. Robert Chen",
          specialty: "Neurology",
          rating: 4.6,
          profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&h=500",
          education: "Harvard Medical School",
          experience: "18 years",
          location: "321 Neuroscience Center, San Francisco, CA",
          phone: "(555) 456-7890",
          email: "dr.chen@medilog.com",
          about: "Dr. Robert Chen is a neurologist with extensive experience in diagnosing and treating complex neurological disorders. He specializes in headache management, movement disorders, and neuromuscular conditions.",
          languages: ["English"],
          acceptingNewPatients: false,
          insuranceAccepted: ["Medicare", "Blue Cross", "Cigna", "UnitedHealthcare"],
          reviews: [
            { id: 1, user: "Patricia D.", rating: 4, comment: "Dr. Chen is very thorough and helped diagnose my condition.", date: "2024-03-30" },
            { id: 2, user: "James W.", rating: 5, comment: "Excellent neurologist who takes time to explain everything.", date: "2024-02-20" }
          ]
        }
      ];

      const selectedDoctor = mockDoctors.find(doc => doc.id === parseInt(id || '1')) || mockDoctors[0];
      setDoctor(selectedDoctor);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleAppointmentBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error('Please select both a date and time slot');
      return;
    }

    const formattedDate = format(selectedDate, 'PP');
    toast.success(`Appointment booked with ${doctor?.name} on ${formattedDate} at ${selectedTimeSlot}`);
    
    // In a real app, this would send the appointment data to a backend
    setTimeout(() => {
      navigate('/appointments');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
        <Navbar />
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-center">
              <div className="h-8 w-48 bg-primary/20 rounded-md mx-auto mb-4"></div>
              <div className="h-4 w-32 bg-primary/10 rounded-md mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-1"
            onClick={() => navigate('/telemedicine')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Telemedicine
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Doctor Profile Info */}
            <div className="lg:col-span-1">
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <div className="aspect-square w-full overflow-hidden">
                  <img 
                    src={doctor.profileImage} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
                  <p className="text-muted-foreground mb-4">{doctor.specialty}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({doctor.reviews.length} reviews)
                    </div>
                  </div>
                  
                  <div className="space-y-4 border-t border-border/50 pt-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Office Location</p>
                        <p className="text-sm text-muted-foreground">{doctor.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{doctor.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center gap-1"
                      onClick={() => toast.success(`Starting video call with ${doctor.name}`)}
                    >
                      <Video className="h-4 w-4" />
                      <span>Video</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center gap-1"
                      onClick={() => toast.success(`Starting voice call with ${doctor.name}`)}
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center gap-1"
                      onClick={() => toast.success(`Chat started with ${doctor.name}`)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Chat</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Doctor Details & Appointment Booking */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-0">
                  <AnimatedTransition type="fadeInUp" delay={0.1}>
                    <Card className="border-border/50 shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">About {doctor.name}</h2>
                        <p className="text-base mb-6 leading-relaxed">{doctor.about}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Education</h3>
                            <p className="text-base mb-4">{doctor.education}</p>
                            
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Experience</h3>
                            <p className="text-base mb-4">{doctor.experience}</p>
                            
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Languages</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {doctor.languages.map((lang: string, index: number) => (
                                <div key={index} className="bg-muted px-2 py-1 rounded-full text-sm">
                                  {lang}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Accepting New Patients</h3>
                            <div className="flex items-center mb-4">
                              {doctor.acceptingNewPatients ? (
                                <>
                                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                  <span className="text-green-700">Yes</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                                  <span className="text-red-700">No</span>
                                </>
                              )}
                            </div>
                            
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Insurance Accepted</h3>
                            <div className="flex flex-wrap gap-2">
                              {doctor.insuranceAccepted.map((insurance: string, index: number) => (
                                <div key={index} className="bg-muted px-2 py-1 rounded-full text-sm">
                                  {insurance}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedTransition>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-0">
                  <AnimatedTransition type="fadeInUp" delay={0.1}>
                    <Card className="border-border/50 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold">Patient Reviews</h2>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-amber-500 mr-1" />
                            <span className="font-medium text-lg">{doctor.rating}</span>
                            <span className="text-muted-foreground ml-2">({doctor.reviews.length} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {doctor.reviews.map((review: any) => (
                            <div key={review.id} className="pb-6 border-b border-border/50 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-medium">{review.user}</p>
                                  <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <p className="text-base mt-2">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedTransition>
                </TabsContent>
                
                <TabsContent value="appointment" className="mt-0">
                  <AnimatedTransition type="fadeInUp" delay={0.1}>
                    <Card className="border-border/50 shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6">Book an Appointment</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-base font-medium mb-4 flex items-center">
                              <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                              Select Date
                            </h3>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border"
                              disabled={(date) => 
                                date < new Date() || 
                                date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                              }
                            />
                          </div>
                          
                          <div>
                            <h3 className="text-base font-medium mb-4 flex items-center">
                              <Clock className="mr-2 h-5 w-5 text-primary" />
                              Select Time Slot
                            </h3>
                            
                            {selectedDate ? (
                              <div className="grid grid-cols-2 gap-2">
                                {mockTimeSlots.map((timeSlot) => (
                                  <Button
                                    key={timeSlot}
                                    variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                                    className={`justify-center ${selectedTimeSlot === timeSlot ? 'bg-primary text-primary-foreground' : ''}`}
                                    onClick={() => setSelectedTimeSlot(timeSlot)}
                                  >
                                    {timeSlot}
                                  </Button>
                                ))}
                              </div>
                            ) : (
                              <div className="flex items-center justify-center h-40 bg-muted/20 rounded-md">
                                <p className="text-muted-foreground">Please select a date first</p>
                              </div>
                            )}
                            
                            <Button 
                              className="w-full mt-6"
                              onClick={handleAppointmentBooking}
                              disabled={!selectedDate || !selectedTimeSlot}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedTransition>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default DoctorProfile;
