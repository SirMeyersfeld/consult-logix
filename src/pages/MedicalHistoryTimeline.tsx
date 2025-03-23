
import React, { useState } from 'react';
import { 
  Activity, 
  CalendarClock, 
  FileText, 
  Filter, 
  Heart, 
  Search, 
  Star, 
  Stethoscope,
  Virus,
  Pills,
  Thermometer
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const SAMPLE_MEDICAL_HISTORY = [
  {
    id: 1,
    date: "2022-05-18",
    category: "Diagnosis",
    title: "Hypertension",
    description: "Diagnosed with Stage 1 hypertension. BP: 145/95.",
    provider: "Dr. Michael Johnson",
    location: "Primary Care Clinic",
    icon: Heart,
    color: "text-red-500"
  },
  {
    id: 2,
    date: "2021-11-03",
    category: "Surgery",
    title: "Appendectomy",
    description: "Laparoscopic appendectomy for acute appendicitis.",
    provider: "Dr. Sarah Chen",
    location: "General Hospital",
    icon: Stethoscope,
    color: "text-blue-500"
  },
  {
    id: 3,
    date: "2020-08-15",
    category: "Illness",
    title: "Pneumonia",
    description: "Community-acquired pneumonia. Treated with antibiotics.",
    provider: "Dr. James Wilson",
    location: "Urgent Care Center",
    icon: Virus,
    color: "text-purple-500"
  },
  {
    id: 4,
    date: "2019-03-22",
    category: "Allergy",
    title: "Penicillin Allergy",
    description: "Moderate allergic reaction to penicillin. Symptoms: rash, hives.",
    provider: "Dr. Anna Martinez",
    location: "Emergency Room",
    icon: Activity,
    color: "text-yellow-500"
  },
  {
    id: 5,
    date: "2018-10-05",
    category: "Chronic Condition",
    title: "Asthma",
    description: "Mild intermittent asthma. Prescribed rescue inhaler.",
    provider: "Dr. Robert Kim",
    location: "Pulmonology Clinic",
    icon: Activity,
    color: "text-green-500"
  },
  {
    id: 6,
    date: "2017-06-12",
    category: "Vaccination",
    title: "Tetanus Booster",
    description: "Td (Tetanus, Diphtheria) booster vaccination.",
    provider: "Dr. Emily Parker",
    location: "Community Health Center",
    icon: Thermometer,
    color: "text-indigo-500"
  },
  {
    id: 7,
    date: "2016-02-28",
    category: "Medication",
    title: "Started Allergy Medication",
    description: "Prescribed Loratadine for seasonal allergies.",
    provider: "Dr. Michael Johnson",
    location: "Primary Care Clinic",
    icon: Pills,
    color: "text-orange-500"
  }
];

// Event categories for filtering
const CATEGORIES = [
  "All",
  "Diagnosis",
  "Surgery",
  "Illness",
  "Allergy",
  "Chronic Condition",
  "Vaccination",
  "Medication"
];

const MedicalHistoryTimeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [medicalHistory, setMedicalHistory] = useState(SAMPLE_MEDICAL_HISTORY);

  // Filter medical history based on search term and active category
  const filteredHistory = medicalHistory.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && (activeCategory === 'All' || item.category === activeCategory);
  });

  // Sort history by date (newest first)
  const sortedHistory = [...filteredHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group history items by year
  const historyByYear = sortedHistory.reduce((groups, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(item);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Medical History Timeline</h1>
          <p className="text-muted-foreground">
            A chronological record of your medical history, conditions, and significant health events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search medical history..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(category => (
                    <Badge 
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Health Summary
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Current Conditions</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Hypertension (Since 2022)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Asthma (Since 2018)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Allergies</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Penicillin
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Current Medications</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Lisinopril (10mg daily)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      Albuterol (As needed)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {Object.keys(historyByYear).length > 0 ? (
              Object.entries(historyByYear)
                .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
                .map(([year, items]) => (
                  <div key={year} className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CalendarClock className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{year}</h2>
                      <div className="h-0.5 flex-grow bg-muted"></div>
                    </div>
                    
                    <div className="relative border-l-2 border-muted pl-6 ml-6 space-y-8">
                      {items.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={item.id} className="relative">
                            <div className="absolute -left-[30px] mt-1 w-5 h-5 rounded-full bg-background border-2 border-muted"></div>
                            <div className="bg-card rounded-lg shadow-md overflow-hidden">
                              <div className="p-5">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                                      <IconComponent className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <Badge variant="outline">
                                          {item.category}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                        <FileText className="h-3 w-3" />
                                        {formatDate(item.date)}
                                      </div>
                                      <p className="mt-3">{item.description}</p>
                                      <div className="mt-4 text-sm">
                                        <div className="flex items-center gap-1">
                                          <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                                          <span className="text-muted-foreground">Provider:</span>
                                          <span className="ml-1">{item.provider}</span>
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                          <span className="text-muted-foreground">Location:</span>
                                          <span className="ml-1">{item.location}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-16 bg-card rounded-lg shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No medical history found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm || activeCategory !== 'All'
                    ? "No items match your current filters. Try adjusting your search or category."
                    : "Your medical history timeline is empty. Add events to start tracking your health journey."}
                </p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing MapPin component
const MapPin = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

export default MedicalHistoryTimeline;
