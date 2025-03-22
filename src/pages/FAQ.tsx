
import React from 'react';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-8">Find answers to the most common questions about MediLog</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is MediLog?</AccordionTrigger>
              <AccordionContent>
                MediLog is a comprehensive healthcare platform that connects patients with doctors, 
                manages medical records, provides telemedicine services, and helps track 
                medications and health metrics. It's designed to modernize healthcare 
                and make it more accessible for everyone.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I sign up for MediLog?</AccordionTrigger>
              <AccordionContent>
                You can sign up by clicking the "Sign Up" button on the navigation bar. 
                You'll need to provide some basic information like your name, email address, 
                and create a password. After registration, you can complete your profile with 
                additional details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What subscription plans do you offer?</AccordionTrigger>
              <AccordionContent>
                We offer two main subscription plans: a Patient Plan at R199/month and a Doctor Plan at 
                R1,999/month. The Patient Plan gives you access to your medical records, digital prescriptions, 
                and more. The Doctor Plan includes advanced tools for healthcare providers. See our 
                <a href="/plan-comparison" className="text-primary hover:underline"> Plan Comparison </a> 
                page for more details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How secure is my medical data?</AccordionTrigger>
              <AccordionContent>
                We take data security very seriously. All medical data is encrypted and stored in 
                secure databases that comply with healthcare privacy standards. We use industry-standard 
                security measures to protect your information and never share it without your consent.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I book consultations with specialists?</AccordionTrigger>
              <AccordionContent>
                Yes, our platform allows you to book consultations with a wide range of healthcare 
                specialists. You can search for doctors by specialty, read their profiles, and book 
                appointments directly through the platform.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I track my medications?</AccordionTrigger>
              <AccordionContent>
                Our medication tracking feature allows you to add your medications, set reminders, 
                and track your adherence. You can easily add new medications, specify dosages, 
                and set custom reminder schedules.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger>What is MediPort?</AccordionTrigger>
              <AccordionContent>
                MediPort is our digital health passport feature that allows you to carry your essential 
                health information wherever you go. It includes allergies, current medications, emergency 
                contacts, and key health metrics, making it easier to share important information with 
                healthcare providers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time by going to your profile settings 
                and selecting "Manage Subscription." Your subscription will remain active until 
                the end of your current billing period.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger>Is telemedicine consultation covered by insurance?</AccordionTrigger>
              <AccordionContent>
                Insurance coverage for telemedicine consultations varies by provider and policy. 
                Many insurance companies now cover telemedicine, but we recommend checking with 
                your insurance provider about specific coverage details.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
              <AccordionContent>
                You can reach our customer support team through the 
                <a href="/contact" className="text-primary hover:underline"> Contact page</a>, 
                by email at support@medilog.com, or by calling our helpline at +27 10 123 4567. 
                We're available Monday through Friday from 8am to 8pm.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default FAQ;
