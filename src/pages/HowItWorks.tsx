
import React from 'react';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Stethoscope, Calendar, Monitor, Pill, FileText, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-12 w-12 text-primary" />,
      title: "Sign Up",
      description: "Create your account in minutes. Choose between patient or doctor account types based on your needs.",
      color: "bg-primary/10"
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-blue-500" />,
      title: "Connect with Doctors",
      description: "Browse doctor profiles, read reviews, and connect with healthcare professionals who meet your needs.",
      color: "bg-blue-500/10"
    },
    {
      icon: <Calendar className="h-12 w-12 text-green-500" />,
      title: "Book Appointments",
      description: "Schedule in-person or telemedicine appointments at times that work for your schedule.",
      color: "bg-green-500/10"
    },
    {
      icon: <Monitor className="h-12 w-12 text-purple-500" />,
      title: "Virtual Consultations",
      description: "Attend video consultations from the comfort of your home with secure, high-quality video technology.",
      color: "bg-purple-500/10"
    },
    {
      icon: <Pill className="h-12 w-12 text-red-500" />,
      title: "Manage Medications",
      description: "Track your medications, set reminders, and receive alerts for refills and dosage schedules.",
      color: "bg-red-500/10"
    },
    {
      icon: <FileText className="h-12 w-12 text-yellow-500" />,
      title: "Access Medical Records",
      description: "View and share your medical history, test results, and health documents securely.",
      color: "bg-yellow-500/10"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">How MediLog Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              MediLog simplifies healthcare management with an intuitive, comprehensive platform for patients and doctors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`${step.color} w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">{step.title}</h3>
                  <p className="text-center text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Your Health Security Matters</h2>
                <p className="text-lg mb-6">
                  MediLog employs enterprise-grade security measures to protect your sensitive health information.
                  All data is encrypted and stored in compliance with healthcare privacy standards.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">End-to-End Encryption</h4>
                    <p className="text-sm text-muted-foreground">Your data is secure in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold">Privacy Controls</h4>
                    <p className="text-sm text-muted-foreground">You control who can access your information</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-background rounded-xl p-6 shadow-lg inline-block">
                  <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
                  <p className="mb-6 text-muted-foreground">
                    Join thousands of users who have transformed their healthcare experience with MediLog
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">Sign Up as Patient</Button>
                    <Button variant="outline" className="w-full" size="lg">Sign Up as Doctor</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help you get the most out of MediLog
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg" asChild>
                <a href="/faq">View FAQ</a>
              </Button>
              <Button size="lg" asChild>
                <a href="/contact-form">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default HowItWorks;
