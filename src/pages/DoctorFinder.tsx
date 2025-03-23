
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Search,
  Phone,
  Star,
  UserRoundCheck,
  BadgeCheck,
  Clock,
  Calendar
} from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from 'sonner';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  address: string;
  distance: number;
  phone: string;
  availableDate: string;
  verified: boolean;
  insuranceAccepted: string[];
  image: string;
}

const DoctorFinder = () => {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('10');
  const [searched, setSearched] = useState(false);
  
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      address: '123 Medical Center Dr, San Francisco, CA',
      distance: 2.3,
      phone: '(415) 555-1234',
      availableDate: 'Tomorrow',
      verified: true,
      insuranceAccepted: ['Blue Shield', 'Medicare', 'Aetna'],
      image: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      rating: 4.6,
      address: '456 Health Blvd, San Francisco, CA',
      distance: 3.7,
      phone: '(415) 555-5678',
      availableDate: 'Next Week',
      verified: true,
      insuranceAccepted: ['United Healthcare', 'Blue Shield', 'Kaiser'],
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      address: '789 Wellness Ave, San Francisco, CA',
      distance: 1.5,
      phone: '(415) 555-9012',
      availableDate: 'Today',
      verified: true,
      insuranceAccepted: ['Cigna', 'Blue Shield', 'Medicare'],
      image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedist',
      rating: 4.7,
      address: '321 Bone & Joint Way, San Francisco, CA',
      distance: 4.2,
      phone: '(415) 555-3456',
      availableDate: 'Next Week',
      verified: false,
      insuranceAccepted: ['Medicare', 'Aetna'],
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      id: '5',
      name: 'Dr. Lisa Patel',
      specialty: 'Neurologist',
      rating: 4.5,
      address: '654 Brain Health St, San Francisco, CA',
      distance: 5.1,
      phone: '(415) 555-7890',
      availableDate: 'Tomorrow',
      verified: true,
      insuranceAccepted: ['Blue Shield', 'United Healthcare', 'Cigna'],
      image: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const handleSearch = () => {
    // Filter doctors based on search criteria
    let filtered = [...doctors];
    
    if (specialty) {
      filtered = filtered.filter(doc => doc.specialty === specialty);
    }
    
    if (distance) {
      filtered = filtered.filter(doc => doc.distance <= parseInt(distance));
    }
    
    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance);
    
    setFilteredDoctors(filtered);
    setSearched(true);
    
    toast.success(`Found ${filtered.length} doctors matching your criteria`);
  };

  const handleScheduleAppointment = (doctorName: string) => {
    toast.success(`Appointment request sent to ${doctorName}`);
  };

  const handleCallDoctor = (phone: string) => {
    toast.success(`Calling ${phone}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-amber-400" />
          <Star className="absolute top-0 left-0 h-4 w-4 fill-amber-400 text-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }
    
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />

      <AnimatedTransition type="fadeInUp">
        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Find a Doctor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Locate specialists in your area that meet your healthcare needs.
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
              <CardDescription>Find specialists that match your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                      <SelectItem value="Orthopedist">Orthopedist</SelectItem>
                      <SelectItem value="Neurologist">Neurologist</SelectItem>
                      <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Your Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="location" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or Zip Code" 
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="distance">Max Distance (miles)</Label>
                  <Select value={distance} onValueChange={setDistance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 miles</SelectItem>
                      <SelectItem value="10">10 miles</SelectItem>
                      <SelectItem value="15">15 miles</SelectItem>
                      <SelectItem value="25">25 miles</SelectItem>
                      <SelectItem value="50">50 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSearch} className="w-full">
                <Search className="mr-2 h-4 w-4" /> Find Doctors
              </Button>
            </CardFooter>
          </Card>

          {searched && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">{filteredDoctors.length} Doctors Found</h2>
              
              {filteredDoctors.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">No doctors found matching your criteria. Try adjusting your search parameters.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredDoctors.map(doctor => (
                  <Card key={doctor.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-muted/30">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                          <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-semibold text-lg text-center">{doctor.name}</h3>
                        <p className="text-muted-foreground text-sm text-center">{doctor.specialty}</p>
                        <div className="flex items-center mt-2">
                          {renderStars(doctor.rating)}
                          <span className="ml-2 text-sm">{doctor.rating}</span>
                        </div>
                        {doctor.verified && (
                          <div className="flex items-center gap-1 text-sm text-primary mt-2">
                            <BadgeCheck className="h-4 w-4" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-2/4 p-6 border-t md:border-t-0 md:border-l border-r-0 md:border-r border-muted">
                        <div className="space-y-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm">{doctor.address}</p>
                              <p className="text-xs text-muted-foreground">{doctor.distance} miles away</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-muted-foreground" />
                            <p className="text-sm">{doctor.phone}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm">Next Available: <span className="font-medium">{doctor.availableDate}</span></p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Insurance Accepted:</p>
                            <div className="flex flex-wrap gap-1">
                              {doctor.insuranceAccepted.map(insurance => (
                                <span key={insurance} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                  {insurance}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 p-6 flex flex-col justify-center gap-4 bg-muted/10">
                        <Button 
                          onClick={() => handleScheduleAppointment(doctor.name)}
                          className="w-full"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Visit
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={() => handleCallDoctor(doctor.phone)}
                          className="w-full"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call Office
                        </Button>
                        
                        <Button variant="ghost" className="w-full">
                          <UserRoundCheck className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default DoctorFinder;
