
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FooterLinks from '@/components/FooterLinks';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';

const PlanComparison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Plan Comparison</h1>
          <p className="text-muted-foreground mb-8">Compare our subscription plans to find the right fit for you</p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detailed Plan Comparison</CardTitle>
              <CardDescription>See all features side by side</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Feature</TableHead>
                    <TableHead>Patient Plan</TableHead>
                    <TableHead>Doctor Plan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    <TableCell>R199/month</TableCell>
                    <TableCell>R1,999/month</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Medical Records Access</TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Digital Prescriptions</TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Consultation Recordings</TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MediPort Health Passport</TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Unlimited Patient Consultations</TableCell>
                    <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Advanced Recording Tools</TableCell>
                    <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Digital Prescription Generator</TableCell>
                    <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Patient History Management</TableCell>
                    <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Priority Support</TableCell>
                    <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                    <TableCell className="text-center"><CheckCircle2 className="mx-auto h-5 w-5 text-green-500" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-semibold mb-6">Subscribe to a Plan</h2>
          <SubscriptionPlans />
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Need more information?</p>
            <div className="flex justify-center gap-4">
              <Link to="/faq" className="text-primary hover:underline">View FAQ</Link>
              <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
      <FooterLinks />
    </div>
  );
};

export default PlanComparison;
