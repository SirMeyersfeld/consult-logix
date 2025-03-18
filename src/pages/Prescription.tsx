
import Navbar from '@/components/Navbar';
import PrescriptionGenerator from '@/components/PrescriptionGenerator';
import AnimatedTransition from '@/components/AnimatedTransition';

const Prescription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/60">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16">
        <AnimatedTransition type="fadeInUp">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Digital Prescription</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate a detailed digital prescription based on your consultation details.
            </p>
          </div>
        </AnimatedTransition>
        
        <PrescriptionGenerator />
      </main>
    </div>
  );
};

export default Prescription;
