import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import FooterLinks from '@/components/FooterLinks';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedTransition delay={0.2} type="fadeInUp">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Our Team
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about MediLog? Want to learn more about our services? Get in touch with our team and we'll be happy to help.
            </p>
          </AnimatedTransition>
        </div>
        
        {/* Contact Info and Form */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <AnimatedTransition delay={0.3} type="fadeInUp">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Reach Out to Us</h2>
              
              <div className="space-y-6">
                {[
                  { 
                    icon: <Mail className="w-5 h-5 text-primary" />,
                    title: "Email Us", 
                    content: "info@medilog.com",
                    description: "For general inquiries"
                  },
                  { 
                    icon: <Phone className="w-5 h-5 text-primary" />,
                    title: "Call Us", 
                    content: "+1 (555) 123-4567",
                    description: "Monday to Friday, 9AM-5PM"
                  },
                  { 
                    icon: <MapPin className="w-5 h-5 text-primary" />,
                    title: "Visit Us", 
                    content: "123 Healthcare Avenue, Medical District",
                    description: "Cape Town, South Africa"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="mb-1">{item.content}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <h3 className="font-semibold text-lg mb-4">Company Leadership</h3>
                <p className="text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground">Liam Meyersfeld</span> – Founder & CEO
                </p>
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">Dylan Friedman</span> – Co-founder & CTO
                </p>
              </div>
            </div>
          </AnimatedTransition>
          
          {/* Contact Form */}
          <AnimatedTransition delay={0.4} type="fadeInUp">
            <div className="bg-white p-8 rounded-xl shadow-subtle border border-border/40">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Write your message here..." 
                    className="min-h-[120px]" 
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </AnimatedTransition>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <FooterLinks />
          
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">© 2024 MediLog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
