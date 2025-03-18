
import Navbar from '@/components/Navbar';
import PrescriptionGenerator from '@/components/PrescriptionGenerator';
import PrescriptionRecorder from '@/components/PrescriptionRecorder';
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <AnimatedTransition type="fadeInUp" delay={0.1}>
            <PrescriptionRecorder />
          </AnimatedTransition>
          
          <AnimatedTransition type="fadeInUp" delay={0.2}>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Consultation Notes</h3>
              <div className="prose prose-sm max-w-none">
                <p>Record your consultation using the recorder on the left. You can save multiple recordings for reference.</p>
                <p className="mt-2">Use the prescription generator below to create a digital prescription based on your consultation findings.</p>
              </div>
            </div>
          </AnimatedTransition>
        </div>
        
        <PrescriptionGenerator />
      </main>
    </div>
  );
};

export default Prescription;
