
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, Calendar, User, Clock, 
  CheckCircle, AlertCircle, Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Vaccinations = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const vaccinations = [
    { 
      id: 1, 
      name: "Influenza (Flu)",
      date: "2023-10-12",
      provider: "Dr. Sarah Johnson",
      location: "City Health Center",
      status: "completed",
      nextDose: null,
      lotNumber: "FL298765",
      type: "annual"
    },
    { 
      id: 2, 
      name: "COVID-19 Booster",
      date: "2023-05-18",
      provider: "Dr. Michael Lee",
      location: "Community Hospital",
      status: "completed",
      nextDose: "2024-05-18",
      lotNumber: "CVD876543",
      type: "booster"
    },
    { 
      id: 3, 
      name: "Tetanus Booster (Tdap)",
      date: "2019-08-03",
      provider: "Dr. Emily Wong",
      location: "University Medical Center",
      status: "completed",
      nextDose: "2029-08-03",
      lotNumber: "TD765432",
      type: "booster"
    },
    { 
      id: 4, 
      name: "Pneumococcal",
      date: "2024-06-25",
      provider: "Dr. Robert Chen",
      location: "City Health Center",
      status: "scheduled",
      nextDose: null,
      lotNumber: null,
      type: "one-time"
    },
    { 
      id: 5, 
      name: "Hepatitis B",
      date: "2022-12-15",
      provider: "Dr. Sarah Johnson",
      location: "Family Health Clinic",
      status: "completed",
      nextDose: null,
      lotNumber: "HB543210",
      type: "series-complete"
    },
    { 
      id: 6, 
      name: "Shingles (Shingrix)",
      date: "2024-07-10",
      provider: "Dr. Michael Lee",
      location: "Community Hospital",
      status: "scheduled",
      nextDose: "2025-01-10",
      lotNumber: null,
      type: "series"
    }
  ];
  
  const filteredVaccinations = vaccinations.filter(vaccination => 
    vaccination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccination.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vaccination.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const upcomingVaccinations = filteredVaccinations.filter(v => v.status === 'scheduled');
  const pastVaccinations = filteredVaccinations.filter(v => v.status === 'completed');
  
  const handleViewDetails = (id: number) => {
    toast.info(`Viewing details for vaccination #${id}`);
    // Navigate to details page in a real app
  };
  
  const handleSchedule = () => {
    toast.success('Vaccination scheduled successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Vaccinations</h1>
            <p className="text-muted-foreground max-w-2xl">
              Track your immunization history and schedule upcoming vaccinations
            </p>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="fadeInUp" delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search vaccinations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button 
              className="flex items-center gap-1"
              onClick={handleSchedule}
            >
              <Plus className="h-4 w-4" />
              Schedule New
            </Button>
          </div>
        </AnimatedTransition>
        
        {upcomingVaccinations.length > 0 && (
          <AnimatedTransition type="fadeInUp" delay={0.2}>
            <h2 className="text-xl font-semibold mb-4">Upcoming Vaccinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {upcomingVaccinations.map((vaccination) => (
                <Card 
                  key={vaccination.id} 
                  className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{vaccination.name}</h3>
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50">
                          Scheduled
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{vaccination.location}</p>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600"
                      onClick={() => handleViewDetails(vaccination.id)}
                    >
                      Details
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Date: {new Date(vaccination.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <User className="w-4 h-4 mr-1" />
                      <span>Provider: {vaccination.provider}</span>
                    </div>
                    
                    {vaccination.nextDose && (
                      <div className="flex items-center text-sm text-blue-600 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Next dose: {new Date(vaccination.nextDose).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </AnimatedTransition>
        )}
        
        <AnimatedTransition type="fadeInUp" delay={0.3}>
          <h2 className="text-xl font-semibold mb-4">Vaccination History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastVaccinations.map((vaccination) => (
              <Card 
                key={vaccination.id} 
                className="p-5 border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{vaccination.name}</h3>
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{vaccination.location}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Date: {new Date(vaccination.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <User className="w-4 h-4 mr-1" />
                    <span>Provider: {vaccination.provider}</span>
                  </div>
                  
                  {vaccination.lotNumber && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Lot #: {vaccination.lotNumber}
                    </div>
                  )}
                  
                  {vaccination.nextDose && (
                    <div className="flex items-center text-sm text-amber-600 mt-2">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Next dose: {new Date(vaccination.nextDose).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleViewDetails(vaccination.id)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          {pastVaccinations.length === 0 && (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Vaccination Records</h3>
              <p className="text-muted-foreground mb-4">No vaccination records matching your search criteria.</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          )}
          
          {pastVaccinations.length > 0 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Vaccinations;
