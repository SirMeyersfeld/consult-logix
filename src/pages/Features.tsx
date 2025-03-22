
import React from 'react';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { Button } from '@/components/ui/button';
import { 
  Pill, 
  Calendar, 
  VideoIcon, 
  FileText, 
  Activity, 
  Shield, 
  Bell, 
  Stethoscope,
  MessageSquare,
  Smartphone,
  ClipboardList,
  GraduationCap
} from 'lucide-react';

const Features = () => {
  const featureSections = [
    {
      title: "For Patients",
      description: "Comprehensive tools to manage your health journey",
      features: [
        {
          icon: <Calendar className="h-6 w-6 text-blue-500" />,
          title: "Appointment Scheduling",
          description: "Book appointments with healthcare providers online, manage your calendar, and receive reminders."
        },
        {
          icon: <VideoIcon className="h-6 w-6 text-indigo-500" />,
          title: "Telemedicine",
          description: "Connect with doctors remotely through secure video consultations from the comfort of your home."
        },
        {
          icon: <Pill className="h-6 w-6 text-red-500" />,
          title: "Medication Management",
          description: "Track your medications, set reminders for doses, and manage refills with ease."
        },
        {
          icon: <FileText className="h-6 w-6 text-green-500" />,
          title: "Medical Records",
          description: "Access your complete medical history, test results, and health documents in one secure place."
        }
      ]
    },
    {
      title: "For Doctors",
      description: "Powerful tools to streamline your practice",
      features: [
        {
          icon: <Stethoscope className="h-6 w-6 text-primary" />,
          title: "Patient Management",
          description: "Efficiently manage your patient roster, medical histories, and treatment plans."
        },
        {
          icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
          title: "Secure Messaging",
          description: "Communicate with patients and colleagues through our HIPAA-compliant messaging system."
        },
        {
          icon: <ClipboardList className="h-6 w-6 text-orange-500" />,
          title: "Prescription Generator",
          description: "Create and manage digital prescriptions with our easy-to-use prescription tool."
        },
        {
          icon: <Activity className="h-6 w-6 text-yellow-500" />,
          title: "Analytics Dashboard",
          description: "Gain insights into your practice with comprehensive analytics and reporting tools."
        }
      ]
    },
    {
      title: "Platform Features",
      description: "Core capabilities that make MediLog unique",
      features: [
        {
          icon: <Shield className="h-6 w-6 text-emerald-500" />,
          title: "Enterprise Security",
          description: "Your data is protected with end-to-end encryption and strict access controls."
        },
        {
          icon: <Smartphone className="h-6 w-6 text-cyan-500" />,
          title: "Mobile Access",
          description: "Access MediLog from any device with our responsive web application."
        },
        {
          icon: <Bell className="h-6 w-6 text-amber-500" />,
          title: "Smart Notifications",
          description: "Receive personalized alerts for appointments, medications, and important health events."
        },
        {
          icon: <GraduationCap className="h-6 w-6 text-pink-500" />,
          title: "Health Education",
          description: "Access a library of verified health information and personalized health tips."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Comprehensive Healthcare Features</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how MediLog's feature-rich platform revolutionizes healthcare management for patients and providers
            </p>
          </div>
          
          {featureSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                <p className="text-lg text-muted-foreground">{section.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                {section.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-4">
                    <div className="mt-1 bg-muted rounded-full p-2 h-fit">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-10 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ready to experience MediLog?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who are already benefiting from our comprehensive healthcare platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/sign-up">Sign Up Now</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/how-it-works">Learn How It Works</a>
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">30K+</h3>
              <p className="text-muted-foreground">Active users on MediLog</p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">5K+</h3>
              <p className="text-muted-foreground">Healthcare providers</p>
            </div>
            <div className="p-6 border rounded-lg text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">99.9%</h3>
              <p className="text-muted-foreground">Uptime reliability</p>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default Features;
