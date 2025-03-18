
import Navbar from '@/components/Navbar';
import MedicalHistory from '@/components/MedicalHistory';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MediPort = () => {
  // Sample user data for demo
  const userData = {
    name: "John Doe",
    age: 35,
    bloodType: "O+",
    allergies: ["Penicillin", "Dust mites"],
    chronicConditions: ["Asthma"],
    lastCheckup: "2023-09-15"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">MediPort Health Passport</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive digital health record containing your complete medical history.
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedTransition type="fadeInUp" delay={0.1} className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="overflow-hidden border-border/50 shadow-lg glass-panel">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{userData.name}</h2>
                      <p className="text-muted-foreground">
                        {userData.age} years old • ID: #MED{Math.random().toString().substr(2, 6)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Type</p>
                      <p className="font-medium">{userData.bloodType}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Allergies</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userData.allergies.map((allergy, index) => (
                          <span key={index} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Chronic Conditions</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userData.chronicConditions.map((condition, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Last Check-up</p>
                      <p className="font-medium">
                        {new Date(userData.lastCheckup).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden border-border/50 shadow-lg glass-panel">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                        <path d="M18 14h-8"></path>
                        <path d="M15 18h-5"></path>
                        <path d="M10 6h8v4h-8V6Z"></path>
                      </svg>
                      Download Full Medical Records
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <path d="M3 9h18"></path>
                        <path d="M9 21V9"></path>
                      </svg>
                      Schedule Appointment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3"></path>
                        <path d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
                        <path d="M9 14v-3"></path>
                        <path d="M12 14v-3"></path>
                        <path d="M15 14v-3"></path>
                        <path d="M12 3v10"></path>
                      </svg>
                      Update Health Information
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.3} className="lg:col-span-2">
            <Card className="overflow-hidden border-border/50 shadow-lg glass-panel">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-6">Medical History</h3>
                <MedicalHistory />
              </div>
            </Card>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default MediPort;
