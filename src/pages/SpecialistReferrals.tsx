
import React, { useState } from 'react';
import { BadgeCheck, Calendar, FileText, MapPin, Phone, Search, User, Clock, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample referral data
const SAMPLE_REFERRALS = [
  {
    id: 1,
    specialist: "Dr. Sarah Chen",
    specialty: "Cardiology",
    reason: "Heart palpitations and chest pain",
    referredBy: "Dr. Michael Johnson",
    referralDate: "2023-12-10",
    status: "Pending",
    appointmentDate: null,
    notes: "Patient to follow up within 2 weeks",
    location: "Heart Center, 123 Medical Blvd",
    phone: "(555) 123-4567",
    priorityLevel: "Routine"
  },
  {
    id: 2,
    specialist: "Dr. James Wilson",
    specialty: "Orthopedics",
    reason: "Chronic lower back pain",
    referredBy: "Dr. Lisa Thompson",
    referralDate: "2023-11-15",
    status: "Scheduled",
    appointmentDate: "2024-01-20",
    notes: "Bring previous X-rays and MRI results",
    location: "Orthopedic Specialists, 456 Health Ave",
    phone: "(555) 987-6543",
    priorityLevel: "Non-urgent"
  },
  {
    id: 3,
    specialist: "Dr. Robert Kim",
    specialty: "Neurology",
    reason: "Migraine headaches, increasing frequency",
    referredBy: "Dr. Emily Parker",
    referralDate: "2023-12-05",
    status: "Completed",
    appointmentDate: "2023-12-15",
    notes: "Prescribed preventative medication. Follow-up in 3 months.",
    location: "Neurology Associates, 789 Brain St",
    phone: "(555) 246-8135",
    priorityLevel: "Urgent"
  },
  {
    id: 4,
    specialist: "Dr. Anna Martinez",
    specialty: "Dermatology",
    reason: "Suspicious mole on upper back",
    referredBy: "Dr. Michael Johnson",
    referralDate: "2023-10-20",
    status: "Pending",
    appointmentDate: null,
    notes: "Patient advised to call for appointment",
    location: "Skin Health Clinic, 101 Dermis Dr",
    phone: "(555) 369-7410",
    priorityLevel: "Urgent"
  }
];

const SpecialistReferrals = () => {
  const [referrals, setReferrals] = useState(SAMPLE_REFERRALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter referrals based on search term and active tab
  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = 
      referral.specialist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && referral.status.toLowerCase() === activeTab.toLowerCase();
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'outline';
      case 'scheduled': return 'secondary';
      case 'completed': return 'default';
      default: return 'outline';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch(priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'routine': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'non-urgent': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Specialist Referrals</h1>
          <p className="text-muted-foreground">
            Track and manage your specialist referrals and appointments
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by specialist, specialty or reason..."
              className="pl-10 w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>
            Request New Referral
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-4 w-full sm:w-1/2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-6">
          {filteredReferrals.length > 0 ? (
            filteredReferrals.map((referral) => (
              <Card key={referral.id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        {referral.specialist}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        {referral.specialty}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getStatusBadgeVariant(referral.status)}>
                        {referral.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityBadgeColor(referral.priorityLevel)}>
                        {referral.priorityLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          Reason for Referral
                        </h4>
                        <p>{referral.reason}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                          Referred By
                        </h4>
                        <p>{referral.referredBy}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(referral.referralDate)}
                        </p>
                      </div>
                      {referral.notes && (
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Notes
                          </h4>
                          <p className="text-sm">{referral.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Appointment
                        </h4>
                        <p className={referral.appointmentDate ? "" : "text-muted-foreground"}>
                          {formatDate(referral.appointmentDate)}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          Location
                        </h4>
                        <p>{referral.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          Contact
                        </h4>
                        <p>{referral.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Referred on {formatDate(referral.referralDate)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {referral.status !== 'Completed' && (
                      <Button size="sm">
                        {referral.status === 'Pending' ? 'Schedule Appointment' : 'Manage Appointment'}
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No referrals found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm 
                  ? "No referrals match your search criteria. Try adjusting your search terms."
                  : "You don't have any specialist referrals yet."}
              </p>
              <Button className="mt-4">Request New Referral</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialistReferrals;
