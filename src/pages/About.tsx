import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookUser, Laptop, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FooterLinks from '@/components/FooterLinks';

const About = () => {
  const navigate = useNavigate();
  
  const leaders = [
    {
      name: "Liam Meyersfeld",
      roles: ["Founder", "CEO"],
      bio: "Liam Meyersfeld is the visionary founder and CEO of MediLog. With a background in healthcare technology and business, Liam identified the critical need for streamlined medical record-keeping and founded MediLog to transform the healthcare experience for both patients and providers.",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "Dylan Friedman",
      roles: ["Co-founder", "CTO"],
      bio: "Dylan Friedman serves as co-founder and CTO of MediLog. With extensive experience in software development and healthcare systems integration, Dylan leads the technical vision of MediLog, ensuring our platform delivers secure, reliable, and cutting-edge solutions for modern healthcare needs.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedTransition delay={0.2} type="fadeInUp">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet the Team Behind <span className="text-primary">MediLog</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to revolutionize healthcare record-keeping, making it more efficient, accurate, and accessible for everyone involved.
            </p>
          </AnimatedTransition>
        </div>
        
        {/* Leadership Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            {leaders.map((leader, index) => (
              <AnimatedTransition key={index} delay={0.3 + index * 0.2} type="fadeInUp">
                <div className="bg-white rounded-xl shadow-subtle overflow-hidden border border-border/40 hover:shadow-elevation transition-all duration-300">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {leader.roles.map((role, i) => (
                        <span key={i} className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{leader.name}</h3>
                    <p className="text-muted-foreground mb-4">{leader.bio}</p>
                  </div>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl mb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedTransition delay={0.3} type="fadeInUp">
                <div className="space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-white text-primary text-sm font-medium">
                    Our Mission
                  </span>
                  <h2 className="text-3xl font-bold">Transforming healthcare through technology</h2>
                  <p className="text-muted-foreground">
                    Founded in 2020, MediLog was created with a simple yet powerful vision: to modernize the way medical information is recorded, shared, and accessed. Our founders, Liam Meyersfeld and Dylan Friedman, recognized that the traditional methods of maintaining medical records were outdated and inefficient.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we're proud to serve thousands of healthcare professionals and patients, making healthcare more accessible, efficient, and personalized than ever before.
                  </p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition delay={0.5} type="fadeInUp">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { 
                      icon: <Users className="w-6 h-6 text-primary" />,
                      title: "Patient-Centered", 
                      description: "We put patients at the heart of everything we do" 
                    },
                    { 
                      icon: <BookUser className="w-6 h-6 text-primary" />,
                      title: "Professional", 
                      description: "Trusted by thousands of healthcare providers" 
                    },
                    { 
                      icon: <Award className="w-6 h-6 text-primary" />,
                      title: "Excellence", 
                      description: "Committed to the highest standards" 
                    },
                    { 
                      icon: <Laptop className="w-6 h-6 text-primary" />,
                      title: "Innovation", 
                      description: "Constantly evolving our technology" 
                    }
                  ].map((value, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-subtle hover:shadow-elevation transition-all duration-300 hover:-translate-y-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </AnimatedTransition>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mb-16 text-center">
          <AnimatedTransition delay={0.3} type="fadeInUp">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join us on our journey</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're just getting started, and we invite you to be part of our story as we continue to transform healthcare for the better.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => navigate('/subscription')} 
                  className="bg-primary hover:bg-primary/90"
                >
                  Get Started Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')} 
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </AnimatedTransition>
        </section>
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

export default About;
