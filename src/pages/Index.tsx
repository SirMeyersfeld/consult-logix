
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import AnimatedTransition from '@/components/AnimatedTransition';
import HealthTips from '@/components/HealthTips';
import MedicationReminder from '@/components/MedicationReminder';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import { CheckCircle, Award, Shield, HeartPulse, ArrowRight, Stars, Users, FileText, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <AnimatedTransition delay={0.2} type="fadeInUp">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Revolutionizing Healthcare
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transforming medical consultations with <span className="text-primary">MediLog</span>
                </h1>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.4} type="fadeInUp">
              <p className="text-lg text-muted-foreground">
                When you visit a doctor, MediLog records the entire consultation—capturing your symptoms, diagnosis, and treatment plan. It generates digital prescriptions and updates your medical history instantly, creating a seamless healthcare experience.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.6} type="fadeInUp">
              <div className="flex flex-wrap gap-4 mt-8">
                <Button 
                  onClick={() => navigate('/consultation')}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Start Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/mediport')}
                  className="h-12 px-8 border-primary text-primary hover:bg-primary/5 transition-all duration-300"
                >
                  View MediPort
                </Button>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition delay={0.8} type="fadeInUp">
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white flex items-center justify-center font-medium text-blue-700">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">2,000+</span> medical professionals trust MediLog
                </p>
              </div>
            </AnimatedTransition>
          </div>
          
          <AnimatedTransition delay={0.5} type="popIn" className="flex-1">
            <div className="relative aspect-square max-w-lg w-full mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl transform rotate-6 shadow-subtle"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 backdrop-blur-sm rounded-3xl shadow-inner-glow"></div>
              
              {/* Main content area */}
              <div className="absolute inset-2 rounded-2xl bg-white shadow-lg overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary/10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-5 w-40 bg-primary/20 rounded-full"></div>
                    <div className="w-8"></div>
                  </div>
                  
                  {/* Content area */}
                  <div className="flex-grow p-6 space-y-4">
                    <div className="h-8 w-2/3 bg-gray-100 rounded-full"></div>
                    
                    <div className="space-y-2 mt-6">
                      <div className="h-4 w-full bg-gray-100 rounded-full"></div>
                      <div className="h-4 w-5/6 bg-gray-100 rounded-full"></div>
                      <div className="h-4 w-4/5 bg-gray-100 rounded-full"></div>
                    </div>
                    
                    <div className="pt-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-2/3 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary/40"></div>
                        <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 right-6">
                      <div className="h-10 w-10 rounded-full bg-primary shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-xl transform rotate-12 animate-float shadow-subtle"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full animate-float shadow-subtle" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/4 -right-8 w-16 h-16 bg-primary/20 rounded-lg transform -rotate-12 animate-float shadow-subtle" style={{ animationDelay: '2s' }}></div>
            </div>
          </AnimatedTransition>
        </div>
        
        {/* Features Dashboard for Authenticated Users */}
        {isAuthenticated && (
          <section className="mt-16 mb-20">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your Health Dashboard</h2>
                  <p className="text-muted-foreground">Quick access to your important health information</p>
                </div>
              </div>
            </AnimatedTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AnimatedTransition type="fadeInUp" delay={0.3}>
                <div className="relative">
                  <MedicationReminder />
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => navigate('/medication-reminders')}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View all medication reminders</span>
                    </Button>
                  </div>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition type="fadeInUp" delay={0.4}>
                <UpcomingAppointments />
              </AnimatedTransition>
              
              <AnimatedTransition type="fadeInUp" delay={0.5}>
                <div className="relative">
                  <HealthTips />
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full"
                      onClick={() => navigate('/health-tips')}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View all health tips</span>
                    </Button>
                  </div>
                </div>
              </AnimatedTransition>
            </div>
          </section>
        )}
        
        {/* Statistics Section */}
        <section className="mt-24 py-12 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl">
          <div className="container mx-auto px-4">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold">Trusted by healthcare professionals worldwide</h2>
                <p className="text-muted-foreground mt-2">Making an impact on healthcare delivery every day</p>
              </div>
            </AnimatedTransition>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "2,000+", label: "Medical Professionals" },
                { value: "150,000+", label: "Patient Records" },
                { value: "85%", label: "Time Saved" },
                { value: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <AnimatedTransition key={index} type="fadeInUp" delay={0.3 + index * 0.1}>
                  <div className="p-6">
                    <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mt-20 mb-16">
          <AnimatedTransition type="fadeInUp" delay={0.3}>
            <h2 className="text-3xl font-bold text-center mb-16">Experience the future of medical records</h2>
          </AnimatedTransition>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Instant Recording",
                description: "Capture every detail of your doctor's consultation, from symptoms to diagnosis, ensuring nothing is missed or forgotten.",
                icon: <FileText className="w-6 h-6" />
              },
              {
                title: "Digital Prescriptions",
                description: "No more paper prescriptions. Get digital prescriptions delivered instantly to your phone or pharmacy of choice.",
                icon: <HeartPulse className="w-6 h-6" />
              },
              {
                title: "MediPort Health Passport",
                description: "Your complete medical history, always up to date and accessible anytime, anywhere when you need it most.",
                icon: <Shield className="w-6 h-6" />
              }
            ].map((feature, index) => (
              <AnimatedTransition key={index} delay={0.3 + index * 0.2} type="fadeInUp">
                <div className="p-6 rounded-xl bg-white shadow-subtle border border-border/40 hover:shadow-elevation transition-all duration-300 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground flex-grow">{feature.description}</p>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-20 bg-gray-50 rounded-3xl my-24">
          <div className="container mx-auto px-4">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Simple Process
                </span>
                <h2 className="text-3xl font-bold">How MediLog works</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our platform simplifies the medical consultation process from start to finish</p>
              </div>
            </AnimatedTransition>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Doctor consultation",
                  description: "Visit your healthcare provider who uses MediLog to record all details of your consultation.",
                  delay: 0.3
                },
                {
                  step: "02",
                  title: "Digital prescription",
                  description: "Receive your prescription digitally, accessible immediately on your MediLog account.",
                  delay: 0.4
                },
                {
                  step: "03",
                  title: "MediPort access",
                  description: "Access your complete medical history anytime through your personalized MediPort.",
                  delay: 0.5
                }
              ].map((step, index) => (
                <AnimatedTransition key={index} type="fadeInUp" delay={step.delay}>
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {step.step}
                    </div>
                    <div className="p-8 pt-10 bg-white rounded-xl shadow-subtle">
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                          <ArrowRight className="text-primary/30" />
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="my-24">
          <AnimatedTransition type="fadeInUp" delay={0.2}>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold">What our users say</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Hear from healthcare professionals and patients who use MediLog</p>
            </div>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Cardiologist",
                testimonial: "MediLog has transformed my practice. I can focus more on patient care and less on paperwork. The digital records are comprehensive and easily accessible.",
                delay: 0.3
              },
              {
                name: "Mark Peterson",
                role: "Patient",
                testimonial: "Having all my medical history in one place is incredibly convenient. I no longer worry about forgetting important details when visiting different doctors.",
                delay: 0.4
              }
            ].map((testimonial, index) => (
              <AnimatedTransition key={index} type="fadeInUp" delay={testimonial.delay}>
                <div className="p-8 bg-white rounded-xl shadow-subtle border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Stars className="text-yellow-400 w-5 h-5" />
                    <Stars className="text-yellow-400 w-5 h-5" />
                    <Stars className="text-yellow-400 w-5 h-5" />
                    <Stars className="text-yellow-400 w-5 h-5" />
                    <Stars className="text-yellow-400 w-5 h-5" />
                  </div>
                  <p className="text-lg mb-6">"{testimonial.testimonial}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        {/* Plans & Pricing Section */}
        <section className="my-24">
          <AnimatedTransition type="fadeInUp" delay={0.2}>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                Pricing
              </span>
              <h2 className="text-3xl font-bold">Choose the right plan for you</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Affordable options for healthcare professionals and patients</p>
            </div>
          </AnimatedTransition>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "For Patients",
                price: "R199",
                period: "/month",
                description: "Access your complete medical history and prescriptions",
                features: ["Unlimited medical records access", "Digital prescriptions", "Share records with healthcare providers", "Email notifications"],
                action: "Subscribe Now",
                delay: 0.3,
                highlight: false,
                route: "/subscription"
              },
              {
                title: "For Healthcare Providers",
                price: "R1,999",
                period: "/month",
                description: "Everything you need to manage patient records",
                features: ["Unlimited patient consultations", "Digital prescription generation", "Advanced analytics dashboard", "Priority support", "Cloud backup"],
                action: "Get Started",
                delay: 0.4,
                highlight: true,
                route: "/subscription"
              }
            ].map((plan, index) => (
              <AnimatedTransition key={index} type="fadeInUp" delay={plan.delay}>
                <div className={`p-8 rounded-xl ${plan.highlight ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' : 'bg-white'} shadow-subtle border border-gray-100 relative overflow-hidden`}>
                  {plan.highlight && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-primary text-white text-xs px-3 py-1 transform rotate-45 translate-y-2 translate-x-6">
                        Popular
                      </div>
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="text-primary w-5 h-5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => navigate(plan.route)}
                    variant={plan.highlight ? "premium" : "default"}
                    className="w-full"
                  >
                    {plan.action}
                  </Button>
                </div>
              </AnimatedTransition>
            ))}
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="my-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                  Why MediLog
                </span>
                <h2 className="text-3xl font-bold mb-6">Medical records reimagined for the digital age</h2>
                <p className="text-muted-foreground mb-8">
                  We're on a mission to transform healthcare record-keeping, making it more efficient, accurate, and accessible for everyone involved.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Secure and Compliant",
                      description: "Your medical data is encrypted and stored securely, complying with all healthcare regulations."
                    },
                    {
                      title: "Seamless Integration",
                      description: "MediLog works with existing healthcare systems, making adoption easy for healthcare providers."
                    },
                    {
                      title: "Patient-Centered",
                      description: "Designed with patients in mind, ensuring easy access to their own medical information."
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition type="fadeInUp" delay={0.4}>
              <div className="relative">
                <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl transform rotate-3"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-elevation">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                      <Users className="text-primary w-10 h-10" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-2xl shadow-subtle p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">Access</div>
                  </div>
                </div>
              </div>
            </AnimatedTransition>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 my-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
            <AnimatedTransition type="fadeInUp" delay={0.2}>
              <h2 className="text-3xl font-bold mb-4">Ready to modernize your healthcare experience?</h2>
              <p className="text-lg text-muted-foreground mb-8">Join thousands of healthcare professionals and patients who trust MediLog</p>
            </AnimatedTransition>
            
            <AnimatedTransition type="fadeInUp" delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  onClick={() => navigate('/consultation')}
                  className="h-12 px-8 bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started Now
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/subscription')}
                  className="h-12 px-8 border-primary text-primary hover:bg-primary/5"
                >
                  View Pricing
                </Button>
              </div>
            </AnimatedTransition>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                  <div className="absolute w-3 h-3 rounded-full bg-primary" />
                </div>
                <span className="text-xl font-semibold">MediLog</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Modernizing healthcare, one consultation at a time.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">© 2024 MediLog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
