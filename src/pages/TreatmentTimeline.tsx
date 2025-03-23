
import React, { useState } from 'react';
import { 
  CalendarClock, 
  CheckCircle, 
  Clock, 
  Hospital, 
  Pill, 
  Syringe, 
  Thermometer, 
  User
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const SAMPLE_TREATMENTS = [
  {
    id: 1,
    date: "2023-12-15",
    type: "Surgery",
    description: "Appendectomy",
    provider: "Dr. Emily Chen",
    location: "General Hospital",
    status: "Completed",
    notes: "Successful procedure with no complications.",
    icon: Hospital
  },
  {
    id: 2,
    date: "2023-11-02",
    type: "Medication",
    description: "Antibiotic prescription",
    provider: "Dr. James Wilson",
    location: "Primary Care Clinic",
    status: "Completed",
    notes: "Prescribed for upper respiratory infection. 7-day course.",
    icon: Pill
  },
  {
    id: 3,
    date: "2023-09-20",
    type: "Therapy",
    description: "Physical therapy - back pain",
    provider: "Sarah Miller, PT",
    location: "Wellness Rehabilitation Center",
    status: "Ongoing",
    notes: "Sessions twice weekly for 6 weeks. Showing improvement.",
    icon: User
  },
  {
    id: 4,
    date: "2023-08-05",
    type: "Vaccination",
    description: "Influenza vaccine",
    provider: "Dr. Anna Johnson",
    location: "Community Health Center",
    status: "Completed",
    notes: "Annual flu shot. No adverse reactions.",
    icon: Syringe
  },
  {
    id: 5,
    date: "2024-01-20",
    type: "Diagnostic",
    description: "MRI - left knee",
    provider: "Dr. Robert Kim",
    location: "Imaging Center",
    status: "Scheduled",
    notes: "Follow-up for persistent knee pain.",
    icon: Thermometer
  }
];

const TreatmentTimeline = () => {
  const [treatments, setTreatments] = useState(SAMPLE_TREATMENTS);
  const [filter, setFilter] = useState("all");

  const filteredTreatments = filter === "all" 
    ? treatments 
    : treatments.filter(t => t.status.toLowerCase() === filter);

  // Sort treatments by date (most recent first)
  const sortedTreatments = [...filteredTreatments].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Treatment Timeline</h1>
          <p className="text-muted-foreground">
            A chronological view of your medical treatments, procedures, and therapies.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "completed" ? "default" : "outline"} 
            onClick={() => setFilter("completed")}
          >
            <CheckCircle size={16} className="mr-2" />
            Completed
          </Button>
          <Button 
            variant={filter === "ongoing" ? "default" : "outline"} 
            onClick={() => setFilter("ongoing")}
          >
            <Clock size={16} className="mr-2" />
            Ongoing
          </Button>
          <Button 
            variant={filter === "scheduled" ? "default" : "outline"} 
            onClick={() => setFilter("scheduled")}
          >
            <CalendarClock size={16} className="mr-2" />
            Scheduled
          </Button>
        </div>

        <div className="space-y-6">
          {sortedTreatments.map((treatment, index) => {
            const IconComponent = treatment.icon;
            return (
              <div key={treatment.id} className="bg-card rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold">{treatment.description}</h3>
                          <Badge variant="outline" className={getStatusColor(treatment.status)}>
                            {treatment.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(treatment.date)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                          <div>
                            <span className="text-sm font-medium">Type:</span>
                            <span className="text-sm ml-2">{treatment.type}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Provider:</span>
                            <span className="text-sm ml-2">{treatment.provider}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Location:</span>
                            <span className="text-sm ml-2">{treatment.location}</span>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div>
                          <span className="text-sm font-medium">Notes:</span>
                          <p className="text-sm mt-1">{treatment.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {sortedTreatments.length === 0 && (
            <div className="text-center py-12 bg-card rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CalendarClock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No treatments found</h3>
              <p className="text-muted-foreground">
                No treatments match your current filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentTimeline;
